import CheckoutForm from "../components/checkout/checkoutForm";
import { useState } from "react";
import { useCart } from "../components/cart/cartContext";
import { useAuth } from "../components/auth/AuthContext";
import '../styles/cartPage.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartId, loading } = useCart();
  const { isLoggedIn } = useAuth();
  const [checkout, setCheckout] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isLoggedIn) return <main><p>Please log in to view cart.</p></main> ;
  if (loading) return <mian><p>Loading cart...</p></mian>;
  if (!cart || cart.length === 0) return <main><p>Your cart is empty.</p></main>;

  return (
    <main>
  <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.product_id} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong>
            <div>Price: £{item.price}</div>
            <div>
              Qty:{" "}
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  if (!isLoggedIn) {
                    alert("Please login to update cart items.");
                    return;
                  }
                  updateQuantity(item.product_id, Number(e.target.value));
                }}
              />
            </div>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  alert("Please login to remove items from cart.");
                  return;
                }
                removeFromCart(item.product_id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: £{totalPrice.toFixed(2)}</h3>

      {checkout ? (
        <CheckoutForm
          cartId={cartId}
          totalAmount={totalPrice}
          onSuccess={clearCart}
        />
      ) : (
        <button onClick={() => setCheckout(true)} disabled={loading || cart.length === 0}>
          Checkout
        </button>
      )}
    </main>

  );
}
