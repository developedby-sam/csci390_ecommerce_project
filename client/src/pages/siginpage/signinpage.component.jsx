import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import "./signinpage.styles.scss";

// Components
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { addItem, showCart } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const Signinpage = ({ setIsLogedin, setUser, addItem, cartItems }) => {
  const navigate = useNavigate();
  const userInfo = {
    email: "",
    password: "",
  };

  // save user-data in state variable
  const [userData, setUserData] = useState(userInfo);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [message, setMessage] = useState("");

  // Event handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Submits form data to the backend and responds
  // based upon the response recieved from the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8001/api/users/signin", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUser(data);

    if (data.status === 200) {
      setIsLogedin(true);

      // fetch cart
      const response = await fetch(
        `http://localhost:8001/api/cart/${data._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const cartData = await response.json();

      if (cartData.status === 200) {
        const cart = cartData.cart.cart;
        cart.map((item) => {
          for (let i = 1; i <= item.quantity; i++) {
            addItem(item);
          }
        });
      }
      navigate("/");
    } else if (data.status === 401) {
      setWrongCredentials(true);
      setMessage(data.message);
    }
  };

  return (
    <div className="signin-page">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h3 className="heading">Sign In</h3>
        <p className="sub-heading">Sign in to your account.</p>
        {wrongCredentials ? <div className="alert-error">{message}</div> : ""}
        <div className="form-data">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={userData.email}
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
        </div>
        <div className="btn-container">
          <CustomButton type="submit">SIGN IN</CustomButton>
          <p>
            If you don't have an account <Link to="/register">register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  showCart: () => dispatch(showCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signinpage);
