import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { API_URL } from "../lib/config";

const MAX_ATTEMPTS = 10;
const INTERVAL_MS = 1500;

function formatMoney(cents, currency) {
    return (cents / 100).toLocaleString(undefined, {
        style: "currency",
        currency: currency.toUpperCase(),
    });
}

export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        if (!sessionId) return;

        let cancelled = false;
        let timer;
        let attempts = 0;

        async function poll() {
            attempts += 1;
            try {
                const res = await fetch(
                    `${API_URL}/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`,
                    { credentials: "include" }
                );
                if (!res.ok) throw new Error(`Request failed (${res.status})`);
                const data = await res.json();
                if (cancelled) return;

                setOrder(data);
                if (data.status === "pending") {
                    if (attempts >= MAX_ATTEMPTS) setTimedOut(true);
                    else timer = setTimeout(poll, INTERVAL_MS);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            }
        }

        poll();
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [sessionId]);

    if (!sessionId) return <p>Missing checkout session.</p>;
    if (error) return <p>Could not load your order: {error}</p>;
    if (!order) return <p>Loading your order...</p>;

    if (order.status === "pending") {
        return timedOut ? (
            <div className="text-center">
                <h1>Payment received, still processing</h1>
                <p>Your order is being confirmed. Check again in a moment.</p>
                <Link className="text-primary font-bold" to="/">Back to the shop</Link>
            </div>
        ) : (
            <p>Confirming your payment...</p>
        );
    }

    if (order.status === "paid") {
        return (
            <div className="text-center">
                <h1>Thank you for your purchase!</h1>
                <ul>
                    {order.items.map((item, i) => (
                        <li key={i}>
                            {item.title} × {item.quantity} ({formatMoney(item.unitAmount, order.currency)})
                        </li>
                    ))}
                </ul>
                <p>Total: {formatMoney(order.totalAmount, order.currency)}</p>
                <Link className="text-primary font-bold" to="/">Continue shopping</Link>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h1>Payment {order.status}</h1>
            <p>Your payment was not completed.</p>
            <Link className="text-primary font-bold" to="/">Back to the shop</Link>
        </div>
    );
}