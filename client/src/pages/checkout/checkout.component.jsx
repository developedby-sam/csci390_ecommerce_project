import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import StripeCheckout from "react-stripe-checkout";

// components and styles
import "./checkout.styles.scss";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "../../redux/cart/cart.selectors";
import ChechkoutItem from "../../components/checkout-item/checkout-item.component";
import FormInput from "../../components/form-input/form-input.component";

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
      <form className="checkout-form">
        <FormInput type="text" placeholder="Full Name" />
        <FormInput type="email" placeholder="Email" />
        <FormInput type="text" placeholder="Billing Address" />
        <FormInput type="text" placeholder="Delivery Address" />
        <FormInput type="tel" placeholder="Telephone Number" />
        <FormInput type="date" placeholder="Date" />
        {/* <CustomButton>CHECKOUT</CustomButton> */}
        <StripeCheckout
          stripeKey="pk_test_51M9FlNEXNedc5Hg4FwPGpd9fA602yszsQMFO9pqyfYzc5ah74FBspvCftwpo3wGvGcoYjGzNUAD7GnaM7ErxL38f00NeFa2RrN"
          label="Pay Now"
          name="EW Ltd."
          billingAddress
          shippingAddress
          amount={200}
          description={`Your total is`}
          // token={"hello"}
        />
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
