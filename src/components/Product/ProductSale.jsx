import React from "react";
import ProductCarousel from "./ProductCarousel";
import emptyProductList from "@assets/images/skinlele-flashsale.webp";

const ProductSale = ({ products = defaultProduct, isLoading, title }) => {
  if (products.length === 0) return null;
  return (
    <div className="p-2 lg:p-12 bg bg-gradient-to-r from-pink-500 to-[#fc9cc7] rounded-lg">
      <div className="flex gap-8 items-center justify-center zoom-in-zoom-out">
        <img src={emptyProductList} alt="Sale" className="w-48 lg:w-80" />
      </div>
      <ProductCarousel {...{ products, isLoading, title }} />
    </div>
  );
};

export default ProductSale;
