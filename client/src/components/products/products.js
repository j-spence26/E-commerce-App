import React, { useState, useEffect } from "react";
import Tile from "../tile/tile";
import { useCart } from "../cart/cartContext";
import "../../styles/tile.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) return <p>Loading products...</p>
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <div>
      <h1>Products</h1>
    <div className="tile-container">
      {products.map((product) => (
        <div key={product.product_id} className="tile-wrapper">
          <Tile product={product} />
          <div className="add-cart-controls">
            <input
              type="number"
              min="1"
              defaultValue={1}
              onChange={(e) =>
                (product.selectedQuantity = Number(e.target.value))
              }
            />
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
      </div>
      ))}
    </div>
     </div>
  );
}
