import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.removeItem("rentifytoken");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <p className="nav-title">Rentify - Where Renting meets Simplicity</p>
      {token && (
        <img
          onClick={logout}
          className="logout"
          src={assets.logout_icon}
          alt=""
        />
      )}{" "}
    </div>
  );
};

export default Navbar;
