import express from "express";
import stripe from "stripe";

const stripe = stripe(
  "pk_test_51M9FlNEXNedc5Hg4FwPGpd9fA602yszsQMFO9pqyfYzc5ah74FBspvCftwpo3wGvGcoYjGzNUAD7GnaM7ErxL38f00NeFa2RrN"
);

const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/checkout-success`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  });

  res.send({ url: session.url });
});

export default stripeRouter;
