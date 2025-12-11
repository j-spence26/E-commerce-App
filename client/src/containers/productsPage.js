import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/cart/cartContext";

export default function ProductPage() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/products/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };
        fetchProduct();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!product) return <p>Loading...</p>;

    return (
        <main>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          
            <button onClick={() => addToCart(product)} >Add to Cart</button>
        </main>
    );
}
