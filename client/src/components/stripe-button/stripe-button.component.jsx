import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51M9FlNEXNedc5Hg4FwPGpd9fA602yszsQMFO9pqyfYzc5ah74FBspvCftwpo3wGvGcoYjGzNUAD7GnaM7ErxL38f00NeFa2RrN";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successfull");
  };

  return (
    <StripeCheckout
      stripeKey={publishableKey}
      label="Pay Now"
      name="EW | Electronics Shop"
      billingAddress
      shippingAddress
      amount={priceForStripe}
      description={`Your total is $${price}`}
      panelLabel="Pay Now"
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;