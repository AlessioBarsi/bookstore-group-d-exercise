import express, { Router } from "express";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "../db/index.js";
import { orders, stripeEvent } from "../db/schema.js";
import { stripe } from "../lib/stripe.js";

const router = Router();

function getOrderId(session) {
  return session.metadata?.orderId ?? session.client_reference_id ?? null;
}

async function markPaid(tx, session) {
  const orderId = getOrderId(session);
  if (!orderId) return; // not one of our orders (e.g. `stripe trigger` test events)

  await tx
    .update(orders)
    .set({
      status: "paid",
      stripePaymentIntentId:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      paidAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(orders.id, orderId), inArray(orders.status, ["pending", "failed"])));
}

async function markPendingAs(tx, session, status) {
  const orderId = getOrderId(session);
  if (!orderId) return;

  await tx
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(orders.id, orderId), eq(orders.status, "pending")));
}

// express.raw is applied only to this route: Stripe's signature check needs the untouched body
router.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return res.status(500).send("Webhook not configured");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe signature verification failed:", err.message);
    return res.status(400).send("Invalid signature");
  }

  // Recording the event and updating the order share one transaction:
  // - if Stripe re-delivers an event we already handled, the insert conflicts and we skip it
  // - if processing throws, everything rolls back and Stripe retries later
  await db.transaction(async (tx) => {
    const inserted = await tx
      .insert(stripeEvent)
      .values({ id: event.id, type: event.type })
      .onConflictDoNothing()
      .returning({ id: stripeEvent.id });

    if (inserted.length === 0) return; // duplicate delivery

    const session = event.data.object;

    switch (event.type) {
      case "checkout.session.completed":
        // For async payment methods the session can complete before the money arrives
        if (session.payment_status === "paid") await markPaid(tx, session);
        break;
      case "checkout.session.async_payment_succeeded":
        await markPaid(tx, session);
        break;
      case "checkout.session.async_payment_failed":
        await markPendingAs(tx, session, "failed");
        break;
      case "checkout.session.expired":
        await markPendingAs(tx, session, "expired");
        break;
      default:
        break; // ignore everything else
    }
  });

  res.json({ received: true });
});

export default router;