import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./signinpage.styles.scss";

// Components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const Signinpage = ({ setIsLogedin }) => {
  const navigate = useNavigate();
  const userInfo = {
    email: "",
    password: "",
  };

  // save user-data in state variable
  const [userData, setUserData] = useState(userInfo);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [signInResponse, setSignInResponse] = useState("")

  // Event handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Submits form data to the backend and responds
  // based upon the response recieved from the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8000/signin", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then( (res) => {
      if (res.status === 200) {
        setIsLogedin(true);
        navigate("/");
      } else if (res.status === 400) {
        setWrongCredentials(true);
        setSignInResponse(res.message)
      }
    });    
  };

  return (
    <div className="signin-page">
      <form className="signin-form" action="#" method="#">
        <h3 className="heading">Sign In</h3>
        <p className="sub-heading">Sign in to your account.</p>
        {wrongCredentials ? (
          <div className="alert-error">
            {signInResponse}
          </div>
        ) : (
          ""
        )}
        <div className="form-data">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={userData.password}
            required
          />
        </div>
        <div className="btn-container">
          <CustomButton onClick={handleSubmit}>SIGN IN</CustomButton>
          <p>
            If you don't have an account <Link to="/register">register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signinpage;
