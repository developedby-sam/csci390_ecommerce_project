import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

// components and stylings
import "./header.styles.scss";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ hidden }) => {
  const pathname = useLocation().pathname;
  return (
    <div className="header">
      <Link to="/">
        <h1>EW | Electronic Shop</h1>
      </Link>
      <div className="options">
        <Link className={`${pathname == "/" ? "active" : ""} option`} to="/">
          HOME
        </Link>
        <Link
          className={`${pathname == "/shop" ? "active" : ""} option`}
          to="shop"
        >
          SHOP
        </Link>
        <Link
          className={`${pathname == "/signin" ? "active" : ""} option`}
          to="signin"
        >
          SIGN IN
        </Link>
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = ({ cart: { hidden } }) => ({
  hidden,
});

export default connect(mapStateToProps)(Header);
