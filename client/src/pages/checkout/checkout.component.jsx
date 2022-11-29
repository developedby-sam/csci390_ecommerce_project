import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

// components and styles
import "./checkout.styles.scss";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "../../redux/cart/cart.selectors";
import ChechkoutItem from "../../components/checkout-item/checkout-item.component";

const CheckoutPage = ({ cartItems, total, itemCount, user }) => {
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
        <ChechkoutItem key={cartItem.id} cartItem={cartItem} user={user} />
      ))}
      <div className="details">
        <div className="total">Quantity: {itemCount}</div>
        <div className="total">Total: ${total}</div>
      </div>
      <StripeCheckoutButton price={total} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps)(CheckoutPage);
