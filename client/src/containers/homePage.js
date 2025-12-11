import React from "react";
import Products from "../components/products/products";
import Reviews from "../components/reviews/reviews";


export default function HomePage() {

  return (
    <main>
       <h1>Welcome!</h1>
      <Products />
      <Reviews />
    </main>
  );
}