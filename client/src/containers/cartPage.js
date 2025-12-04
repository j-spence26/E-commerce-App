import React from "react";
import { useCart } from "../components/cart/cartContext";
import { useAuth } from "../components/auth/AuthContext";
const { isLoggedIn } = useAuth;

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartId, loading } = useCart();
  const { isLoggedIn } = useAuth(); 
  console.log("See cart below:", cart);

  const items = Array.isArray(cart) ? cart : [];

 
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const checkoutCart = async () => {
    if (!isLoggedIn) {
      alert("Please login before checking out.");
      return;
    }
    if (!cartId || loading) return;

    try {
      const res = await fetch(`http://localhost:3000/cart/${cartId}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      console.log("Checkout successful:", data);
      clearCart();
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <h2>Your Cart</h2>

      {!isLoggedIn && <p>Please log in to add items to your cart.</p>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
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

          <button onClick={checkoutCart} disabled={!cartId || items.length === 0 || !isLoggedIn}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}