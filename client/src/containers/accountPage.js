import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../components/auth/AuthContext";
import { useCart } from "../components/cart/cartContext";

export default function Account() {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", { credentials: "include" });
      const data = await res.json();
      if (data.user?.customer_id) setCustomerId(data.user.customer_id);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchOrderHistory = async (customer_id) => {
    try {
      const res = await fetch(`http://localhost:3000/orders/${customerId}}`, { credentials: "include" });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders: ", err)
    }
  }
    useEffect(() => { 
    if (isLoggedIn) 
      {setCustomerId(fetchUser)
        fetchOrderHistory(customerId)
  } else {
     setOrders([]);
    setLoading(false);
  }
}, [isLoggedIn]);
  return (
   <div>
      <h2>My Account</h2>

      {!isLoggedIn && <p>Please log in to see order history.</p>}

      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        <>
          <ul>
            {orders.map((item) => (
              <p> {item.product} </p>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}