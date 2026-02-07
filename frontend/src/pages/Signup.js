import React, { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await api.post("/api/auth/signup", form);
    navigate("/");
  };

  return (
    <div className="box">
      <h2>Signup</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="DEALER">DEALER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button onClick={submit}>Create</button>
      <Link to="/">Login</Link>
    </div>
  );
}
