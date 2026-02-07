import React, { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    const res = await api.post("/api/auth/login", { email, password });
    login(res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
