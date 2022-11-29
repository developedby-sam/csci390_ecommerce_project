import express from "express";
import cartModel from "../models/cartModel.js";

const cartRouter = express.Router();

// Get cartItems based upon the userId
// passed as a param from the database
// and return to cartItem to the backend
cartRouter.get("/:id", async (req, res) => {
  // If cart is found in the database return cartItems as response
  // or retturn CART NOT FOUND status
  const cartItems = await cartModel.findById(req.params.id);
  if (cartItems) {
    return res.json({ status: 200, message: "CART FOUND", cart: cartItems });
  }
  return res.json({ status: 404, message: "CART NOT FOUND" });
});

// Post carrItems to the mongodb cart documents
cartRouter.post("/addToCart", async (req, res) => {
  // Create new CartModel
  const newCart = new cartModel({
    _id: req.body._id,
    cart: req.body.cart,
  });

  const cart = await cartModel.findOne({ _id: newCart._id });
  if (cart) {
    cart.cart = newCart.cart;
    const updatedCart = await cart.save();
    return res.json({ message: "CART UPDATED", cart: updatedCart });
  } else {
    const cart = await newCart.save();
    return res.json({ message: "CART CREATED", cart: cart });
  }
});

export default cartRouter;
