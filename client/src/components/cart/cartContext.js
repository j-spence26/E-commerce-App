import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isLoggedIn } = useAuth();

  const [cart, setCart] = useState([]);    
  const [cartId, setCartId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", { credentials: "include" });
      const data = await res.json();
      if (data.user?.customer_id) setCustomerId(data.user.customer_id);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };


  const getOrCreateCart = async (customer_id) => {
    try {
      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id }),
      });
      const data = await res.json();
      setCartId(data.cart_id);

      setCart((data.products || []).map(item => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })));
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };


  const syncItem = async (item) => {
    if (!cartId || !item) return;

    try {
      await fetch(`http://localhost:3000/cart/${cartId}/items`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    } catch (err) {
      console.error("Error syncing item:", err);
    }
  };


  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product_id === product.product_id);
      const updatedCart = existing
        ? prev.map(item => item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
          )
        : [...prev, { ...product, quantity }];

      if (cartId) {
        const changedItem = updatedCart.find(item => item.product_id === product.product_id);
        syncItem(changedItem);
      }

      return updatedCart;
    });
  };


  const updateQuantity = (product_id, quantity) => {
    setCart(prev => {
      const updatedCart = prev.map(item => item.product_id === product_id
        ? { ...item, quantity }
        : item
      );

      if (cartId) {
        const changedItem = updatedCart.find(item => item.product_id === product_id);
        syncItem(changedItem);
      }

      return updatedCart;
    });
  };


  const removeFromCart = (product_id) => {
    setCart(prev => prev.filter(item => item.product_id !== product_id));

    
  };


  const clearCart = () => {
    setCart([]);
  };


  useEffect(() => { 
    if (isLoggedIn) {fetchUser()
  } else {
     setCart([]);
    setCartId(null);
    setLoading(false);
  }
}, [isLoggedIn]);
  useEffect(() => { if (customerId) getOrCreateCart(customerId); }, [customerId]);

  return (
    <CartContext.Provider value={{
      cart,
      cartId,
      customerId,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
