import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { url, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    type: "seller",
    password: "",
    confirmPassword: "",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password does not match.");
      return;
    }
    const response = await axios.post(`${url}/api/user/register`, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("rentifytoken", response.data.token);
      navigate(`/${response.data.type}`);
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="signup">
      <form className="" onSubmit={onSubmitHandler}>
        <div className="">
          <p>First name</p>
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="">
          <p>Last name</p>
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="">
          <p>Email</p>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Type here"
            required
          />
        </div>
        <div className="">
          <p>Phone no</p>
          <input
            name="phoneNo"
            onChange={onChangeHandler}
            value={data.phoneNo}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="">
          <p>User Type</p>
          <select name="type" onChange={onChangeHandler}>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <div className="">
          <p>Password</p>
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Type here"
            required
          />
        </div>
        <div className="">
          <p>Confirm Password</p>
          <input
            name="confirmPassword"
            onChange={onChangeHandler}
            value={data.confirmPassword}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <button type="submit" className="signin-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
