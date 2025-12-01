import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      setMessage("User created! Your ID: " + data.customer_id);
      
      navigate("/homePage");
    } else {
      setMessage("Error: " + data.error);
    }

  };

  return (
    <div>
      <h2>Create account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    <Link to="/loginPage">
    Click Here To Login!
    </Link>
    </div>
  );
}
