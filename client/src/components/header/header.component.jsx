import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// components and stylings
import "./header.styles.scss";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ hidden, isLogedin, setIsLogedin }) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (isLogedin) {
      setIsLogedin(false);
    } else {
      navigate("/signin");
    }
  };

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
          to=""
          onClick={handleClick}
        >
          {isLogedin ? `SIGN OUT` : "SIGN IN"}
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
