import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// components and stylings
import "./header.styles.scss";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { clearCart } from "../../redux/cart/cart.actions";

const Header = ({ hidden, isLogedin, setIsLogedin, clearCart }) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (isLogedin) {
      setIsLogedin(false);
      clearCart();
      navigate("/");
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

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
