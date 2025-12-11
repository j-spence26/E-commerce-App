import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../styles/checkoutForm.css";


export default function CheckoutForm({ cartId, totalAmount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/cart/${cartId}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount: totalAmount * 100 }) 
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-input-container" >
        <CardElement />
      </div>
      
      <button type="submit" disabled={!stripe}>Pay £{totalAmount.toFixed(2)}</button>
      <p>{message}</p>
    </form>
  );
}
