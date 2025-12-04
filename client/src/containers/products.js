import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Root, { ROUTES } from "../components/root/root";

export default function Products() {
    const [products, setProducts ] = useState([]);
    const [error, setError ] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const res = await fetch("http://localhost:3000/products", {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Faield to fetch Products");
            }
            const data = await res.json();
            console.log(data);
            setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Error fetching products");
            }
        };

        fetchProducts();
    }, []);

  
  return (
    <div>
        <h2>Products</h2>
        {error && <p>{error}</p>}
        <ul>
            {products.map((p) => (
                <li key={p.product_id}>
                    <Link to={`/products/${p.product_id}`} >
                    <strong>{p.name}</strong>: {p.description}
                    </Link>
                    
                </li>
            ))}
        </ul>
    </div>
  );
}
