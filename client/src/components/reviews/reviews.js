import { useState, useEffect } from "react";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch("http://localhost:3000/reviews", {
                    method: "GET"
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch Reviews")
                }

                const data = await res.json();
                setReviews(data);
            } catch (err) {
                console.log(err);
                setError("Error fetching reviews")
            }
        };
        fetchReviews();
    }, []);

    return (
        <div>
            <h2>Reviews</h2>
            {error && <p>{error}</p>}
            <ul>
                {reviews.map((r) => (
                    <li key={r.id} >
                        <strong>Author: {r.nickname}</strong>
                        <p>Review: {r.review} </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}