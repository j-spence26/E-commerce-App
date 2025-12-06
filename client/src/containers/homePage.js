import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ProductPage from "./productsPage";

export default function HomePage() {

/*const fetchReviews = async () => {
  const res = await fetch(), {

  }
}*/
 

  return (
    <div>
      <h1>Welcome!</h1>

      <h1>Products</h1>
      <ProductPage />

      <h1>Reviews</h1>
    </div>
  );
}