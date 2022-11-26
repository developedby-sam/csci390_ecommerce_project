import React from "react";

import "./registerpage.styles.scss";

// Components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("Clicked")
  // await fetch("http://localhost:8000/register", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     name: event.target.name.value,
  //     email: event.target.email.value,
  //     phoneNumber: parseInt(event.target.number.value),
  //     password: event.target.password.value
  //   }),
  //   headers: {'Content-Type': 'application/json' }
  // })
  console.log(event.target)
  
}

const Registerpage = () => {
  return (
    <div className="register-page">
      <form className="registration-form" onSubmit={handleSubmit} method="POST">
        <h3 className="heading">Register</h3>
        <p className="sub-heading">
          Create your account. It's free and only takes a minute.
        </p>
        <div className="form-data">
          <FormInput name="name" type="text"  placeholder="Full Name" required />
          <FormInput name="email" type="email" placeholder="Email" required />
          <FormInput name="phoneNumber" type="number" placeholder="Contact Number" required />
          <FormInput name="password" type="password" placeholder="Password" required />
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
