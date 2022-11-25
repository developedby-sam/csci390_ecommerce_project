import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components and styles
import "./checkout.styles.scss";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "../../redux/cart/cart.selectors";
import ChechkoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";

const CheckoutPage = ({ cartItems, total, itemCount }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <ChechkoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="details">
        <div className="total">Quantity: {itemCount}</div>
        <div className="total">Total: ${total}</div>
      </div>
      <form className="checkout-form">
        <FormInput type="text" placeholder="Full Name" />
        <FormInput type="email" placeholder="Email" />
        <FormInput type="text" placeholder="Billing Address" />
        <FormInput type="text" placeholder="Delivery Address" />
        <FormInput type="tel" placeholder="Telephone Number" />
        <FormInput type="date" placeholder="Date" />
        <CustomButton>CHECKOUT</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps)(CheckoutPage);
