import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };


    return (
    <div className="navbar">
      <h3 className="navbar-logo">Regrip Bidding</h3>

      <button className="navbar-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}