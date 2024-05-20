import React, { useState } from "react";
import Signin from "./Signin";
import "./Home.css";
import Signup from "./Signup";
const Home = () => {
  const [activeButton, setActiveButton] = useState("signin");
  const signinButtonClick = () => {
    setActiveButton("signin");
  };
  const SignupButtonClick = () => {
    setActiveButton("signup");
  };
  return (
    <div>
      <div className="homepage">
        <div className="btn-holder">
          <button
            className={`btn-home ${
              activeButton === "signin" ? "btn-active" : ""
            }`}
            onClick={signinButtonClick}
          >
            Login
          </button>
          <button
            className={`btn-home ${
              activeButton === "signup" ? "btn-active" : ""
            }`}
            onClick={SignupButtonClick}
          >
            Register
          </button>
        </div>
        {activeButton === "signin" && <Signin />}
        {activeButton === "signup" && <Signup />}
      </div>
    </div>
  );
};

export default Home;
