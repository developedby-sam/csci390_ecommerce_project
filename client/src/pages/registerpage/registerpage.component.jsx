import React from "react";
import {useState} from "react";
import "./registerpage.styles.scss";

// Components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const Registerpage = () => {

  const [userData, setUserData] = useState({
    name: "",
    email:"",
    phoneNumber:"",
    password:""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Clicked");
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        phoneNumber: parseInt(userData.phoneNumber),
        password: userData.password
      }),
      headers: {'Content-Type': 'application/json' }
    })
    // To handle the response from the mongodb database
    // .then(
    //   (res) => {
    //     if (res.status == 500){
    //       alert("Already exists with the aboe entered email.")
    //     }
    //   }
    // );
    console.log(event.target)
  }
  
  const handleInputChange = (event) => {
    const {name, value} = event.target;
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
        <div className="form-data">
          <FormInput name="name" type="text"  placeholder="Full Name" onChange={handleInputChange} value={userData.name} required />
          <FormInput name="email" type="email" placeholder="Email" onChange={handleInputChange} value={userData.email} required />
          <FormInput name="phoneNumber" type="number" placeholder="Contact Number" onChange={handleInputChange} value={userData.phoneNumber} required />
          <FormInput name="password" type="password" placeholder="Password" onChange={handleInputChange} value={userData.password} required />
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
