import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";

export default function Account() {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);


  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", { credentials: "include" });
      const data = await res.json();
      if (data.user?.customer_id) setCustomerId(data.user.customer_id);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };


  const fetchOrderHistory = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/order/${id}`, { credentials: "include" });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [isLoggedIn]);


  useEffect(() => {
    if (customerId) {
      fetchOrderHistory(customerId);
    }
  }, [customerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Account</h2>
      {!isLoggedIn ? (
        <p>Please log in to see order history.</p>
      ) : orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        <ul>
  {orders.map((order) => (
    <li key={order.order_id}>
      <p>Order #{order.order_id}</p>
      <ul>
        {order.products.map((product) => (
          <li key={product.product_id}>
            {product.name} - £{product.price} x {product.quantity}
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

      )}
    </div>
  );
}
