import React, { useState, useEffect } from "react";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";

const PRODUCT_CATEGORY = [
  {
    title: "laptops",
    imageUrl: "https://electronic-ecommerce.herokuapp.com/dellxps15.jpg",
    id: 1,
    linkUrl: "shop",
  },
  {
    title: "keyboards",
    imageUrl: "https://electronic-ecommerce.herokuapp.com/fantechkeyboard.jpg",
    id: 2,
    linkUrl: "shop",
  },
  {
    title: "headsets",
    imageUrl: "https://electronic-ecommerce.herokuapp.com/fantechHeadset.jpg",
    id: 3,
    linkUrl: "shop",
  },
  {
    title: "smartphones",
    imageUrl: "https://electronic-ecommerce.herokuapp.com/onePlusNord.jpg",
    size: "large",
    id: 4,
    linkUrl: "shop",
  },
];

const Directory = () => {
  const [products, setProducts] = useState(PRODUCT_CATEGORY);

  return (
    <div className="directory-menu">
      {products.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
