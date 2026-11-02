import { Link } from "react-router";

export default function CheckoutCancel() {
  return (
    <div>
      <h1>Checkout cancelled</h1>
      <p>You were not charged.</p>
      <Link className="text-primary font-bold" to="/">Back to the shop</Link>
    </div>
  );
}