import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// components
import "./product-item.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { addItem, showCart } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const ProductItem = ({ item, addItem, user, cartItems }) => {
  const { name, price, image, stock, category } = item;
  const imageUrl = `https://electronic-ecommerce.herokuapp.com/${image}`;

  const handleAddToCart = async () => {
    const cartData = {
      _id: user._id,
      cart: cartItems,
    };

    const response = await fetch("http://localhost:8001/api/cart/addToCart", {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="product-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="product-footer">
        <span className="name">{name.toUpperCase()}</span>
        <div className="details">
          <span>Price: {`${price}`}</span>
          <span>In stock: {`${stock}`}</span>
          <span>
            Category:{" "}
            {`${category[1].charAt(0).toUpperCase() + category[1].slice(1)}`}
          </span>
        </div>
      </div>
      <CustomButton
        onClick={() => {
          addItem(item);
          handleAddToCart();
        }}
      >
        ADD TO CART
      </CustomButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
