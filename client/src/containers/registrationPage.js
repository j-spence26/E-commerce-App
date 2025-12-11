import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import '../styles/register.css';


export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
    <main>
      <div className="title" >
        <h2>Create account</h2>
      </div>
      <div className="registration-form">
        <div className="registration-form" >
            <form onSubmit={handleSubmit}>
          <input
            className="registration-input"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="registration-input"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className="registration-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="registration-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="register-button" type="submit">Register</button>
        </form>
        </div>
      
        <p>{message}</p>
       <div className="login-link-wrapper">
      <Link className="login-link" to="/loginPage">
        Click Here To Login!
      </Link>
    </div>

      </div>
    </main>
  );
}
