import { Router } from "express";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { book, orders, orderItems } from "../db/schema.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validate.js";
import { stripe } from "../lib/stripe.js";

const router = Router();
router.use(requireAuth);

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const CURRENCY = "eur";

const checkoutBody = z.object({
  items: z
    .array(
      z.object({
        bookId: z.uuid(),
        quantity: z.int().min(1).max(10),
      })
    )
    .min(1)
    .max(50),
});

router.post("/", validate({ body: checkoutBody }), async (req, res) => {
  const { items } = req.valid.body;

  // 1. Merge duplicate book ids so each book appears once
  const quantities = new Map();
  for (const { bookId, quantity } of items) {
    quantities.set(bookId, (quantities.get(bookId) ?? 0) + quantity);
  }
  const bookIds = [...quantities.keys()];

  // 2. Load the books from the DB: prices come from here, never from the client
  const books = await db
    .select({ id: book.id, title: book.title, price: book.price })
    .from(book)
    .where(inArray(book.id, bookIds));

  if (books.length !== bookIds.length) {
    return res.status(400).json({ error: "One or more books do not exist" });
  }

  const unpriced = books.find((b) => b.price == null);
  if (unpriced) {
    return res
      .status(400)
      .json({ error: `"${unpriced.title}" is not available for purchase` });
  }

  // 3. Build line items in cents
  const lines = books.map((b) => ({
    bookId: b.id,
    title: b.title,
    unitAmount: Math.round(Number(b.price) * 100),
    quantity: quantities.get(b.id),
  }));
  const totalAmount = lines.reduce((sum, l) => sum + l.unitAmount * l.quantity, 0);

  // 4. Create the pending order and its items atomically
  const order = await db.transaction(async (tx) => {
    const [created] = await tx
      .insert(orders)
      .values({
        userId: req.user.id,
        totalAmount,
        currency: CURRENCY,
      })
      .returning();

    await tx.insert(orderItems).values(
      lines.map((l) => ({ orderId: created.id, ...l }))
    );

    return created;
  });

  // 5. Create the Stripe Checkout Session
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: req.user.email,
      client_reference_id: order.id,
      metadata: { orderId: order.id },
      payment_intent_data: { metadata: { orderId: order.id } },
      line_items: lines.map((l) => ({
        quantity: l.quantity,
        price_data: {
          currency: CURRENCY,
          unit_amount: l.unitAmount,
          product_data: { name: l.title },
        },
      })),
      success_url: `${CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/checkout/cancel`,
    });
  } catch (err) {
    await db
      .update(orders)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(orders.id, order.id));
    throw err;
  }

  // 6. Save the session id on the order and return the redirect URL
  await db
    .update(orders)
    .set({ stripeCheckoutSessionId: session.id, updatedAt: new Date() })
    .where(eq(orders.id, order.id));

  res.status(201).json({ url: session.url, orderId: order.id });
});

const statusQuery = z.object({ session_id: z.string().min(1).max(255) });

router.get("/status", validate({ query: statusQuery }), async (req, res) => {
  const { session_id } = req.valid.query;

  // Filtering by userId means you can only see your own orders
  const [order] = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.stripeCheckoutSessionId, session_id),
        eq(orders.userId, req.user.id)
      )
    );

  if (!order) return res.status(404).json({ error: "Order not found" });

  const items = await db
    .select({
      title: orderItems.title,
      unitAmount: orderItems.unitAmount,
      quantity: orderItems.quantity,
    })
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  res.json({
    id: order.id,
    status: order.status,
    totalAmount: order.totalAmount,
    currency: order.currency,
    paidAt: order.paidAt,
    items,
  });
});

export default router;