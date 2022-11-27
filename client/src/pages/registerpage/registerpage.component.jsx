import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registerpage.styles.scss";

// Components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const Registerpage = ({ setIsLogedin }) => {
  const navigate = useNavigate();

  // Storing user data in state to keep track of if
  // user is logged in or not and to save data in the backend
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [userExist, setUserExist] = useState(false);
  const [message, setMessage] = useState("");

  // Handles submission of the form data to the backend
  // COllectes user name and email and reset password to
  // prevents privacy issues
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (data.status === 200) {
      navigate("/");
      setUserExist(false);
      setIsLogedin(true);
    } else if (data.status === 403) {
      setUserExist(true);
      setMessage(data.message);
    }
  };

  // Handles and update userform data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="register-page">
      <form className="registration-form" onSubmit={handleSubmit} method="POST">
        <h3 className="heading">Register</h3>
        <p className="sub-heading">
          Create your account. It's free and only takes a minute.
        </p>
        {userExist ? <div className="duplicate">{message}</div> : ""}
        <div className="form-data">
          <FormInput
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleInputChange}
            value={userData.name}
            required
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <FormInput
            name="phoneNumber"
            type="number"
            placeholder="Contact Number"
            onChange={handleInputChange}
            value={userData.phoneNumber}
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
          {/* <FormInput name="name" type="password" placeholder="Confirm Password" required /> */}
          <div className="terms-and-conditions">
            <FormInput type="checkbox" required /> I accept the Terms of Use &
            Privacy Policy
          </div>
        </div>
        <CustomButton type="submit">REGISTER</CustomButton>
      </form>
    </div>
  );
};

export default Registerpage;
