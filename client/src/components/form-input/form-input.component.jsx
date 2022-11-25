import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ ...inputProps }) => (
  <div className="group">
    <input className="form-input" {...inputProps} />
  </div>
);

export default FormInput;
