import React from "react";
import { Link } from "react-router-dom";

import "./signinpage.styles.scss";

// Components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

const Signinpage = () => {
  return (
    <div className="signin-page">
      <form className="signin-form" action="#" method="#">
        <h3 className="heading">Sign In</h3>
        <p className="sub-heading">Sign in to your account.</p>
        <div className="form-data">
          <FormInput type="email" placeholder="Email" required />
          <FormInput type="password" placeholder="Password" required />
        </div>
        <div className="btn-container">
          <CustomButton>SIGN IN</CustomButton>
          <p>
            If you don't have an account <Link to="/register">register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signinpage;
