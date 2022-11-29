import React from "react";
import { connect } from "react-redux";

// components and styles
import "./checkout-item.styles.scss";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const ChechkoutItem = ({
  cartItem,
  clearItem,
  addItem,
  removeItem,
  cartItems,
  user,
}) => {
  const { name, price, quantity, image } = cartItem;
  const imageUrl = `https://electronic-ecommerce.herokuapp.com/${image}`;

  const handleAddToCart = async () => {
    console.log(cartItems);
    const cartData = {
      _id: user._id,
      cart: cartItems,
    };

    await fetch("http://localhost:8001/api/cart/addToCart", {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => {
            removeItem(cartItem);
            handleAddToCart();
          }}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            addItem(cartItem);
            handleAddToCart();
          }}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => {
          clearItem(cartItem);
          handleAddToCart();
        }}
      >
        &#10005;
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChechkoutItem);
