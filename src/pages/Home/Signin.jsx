import React, { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const { url, setToken } = useContext(StoreContext);

  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const onLoginFormInputChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(loginDetails);

    const response = await axios.post(`${url}/api/user/login`, loginDetails);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("rentifytoken", response.data.token);
      navigate(`/${response.data.type}`);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="signin-div">
      <h2 className="home-heading">
        Login to your account using your Email and Password.
      </h2>
      <input
        type="email"
        value={loginDetails.email}
        onChange={onLoginFormInputChange}
        name="email"
        placeholder="email"
      />{" "}
      <br />
      <input
        type="password"
        value={loginDetails.password}
        onChange={onLoginFormInputChange}
        name="password"
        placeholder="password"
      />{" "}
      <br />
      <button className="signin-btn" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default Signin;
