import React from "react";
import "./custom-button.styles.scss";

const CustomButton = function ({
  children,
  inverted,
  disabled,
  ...otherButtonProps
}) {
  return (
    <button
      className={`${inverted ? "inverted" : ""} ${
        disabled ? "disabled" : ""
      } custom-button`}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
