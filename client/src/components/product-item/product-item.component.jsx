import React from "react";
import { connect } from "react-redux";

// components
import "./product-item.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { addItem, showCart } from "../../redux/cart/cart.actions";

const ProductItem = ({ item, addItem, showCart }) => {
  const { name, price, image, stock, category } = item;
  const imageUrl = `https://electronic-ecommerce.herokuapp.com/${image}`;

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
          showCart();
        }}
      >
        ADD TO CART
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  showCart: () => dispatch(showCart()),
});

export default connect(null, mapDispatchToProps)(ProductItem);
