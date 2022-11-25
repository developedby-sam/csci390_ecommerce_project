import React, { useState } from "react";
import "./shoppage.styles.scss";

import ProductPreview from "../../components/product-preview/product-preview.component";
import FormInput from "../../components/form-input/form-input.component";

const Shoppage = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = function (event) {
    setSearchValue(event.target.value.toLowerCase());
  };

  return (
    <div className="shop-page">
      <FormInput
        type="text"
        name="search"
        id="searchBtn"
        placeholder="Search for products"
        onChange={handleChange}
      />
      <ProductPreview searchValue={searchValue} />
    </div>
  );
};

export default Shoppage;
