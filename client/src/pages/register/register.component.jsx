import React from "react";

import "./register.styles.scss";

// Components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const Registerpage = () => {
  return (
    <div className="register-page">
      <form className="registration-form" action="#" method="#">
        <h3 className="heading">Register</h3>
        <p className="sub-heading">
          Create your account. It's free and only takes a minute.
        </p>
        <div className="form-data">
          <FormInput type="text" placeholder="Full Name" required />
          <FormInput type="email" placeholder="Email" required />
          <FormInput type="number" placeholder="Contact Number" required />
          <FormInput type="password" placeholder="Password" required />
          <FormInput type="password" placeholder="Confirm Password" required />
          <div className="terms-and-conditions">
            <FormInput type="checkbox" required /> I accept the Terms of Use &
            Privacy Policy
          </div>
        </div>
        <CustomButton>REGISTER</CustomButton>
      </form>
    </div>
  );
};

export default Registerpage;
