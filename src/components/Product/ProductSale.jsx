import React from "react";
import ProductCarousel from "./ProductCarousel";

const ProductSale = () => {
  return (
    <div className="p-2 lg:p-12 bg bg-gradient-to-r from-pink-500 to-[#fc9cc7] rounded-lg">
      <div className="flex gap-8 items-center justify-center">
        <img
          src="https://image.hsv-tech.io/1920x0/bbx/common/165e9150-d748-49be-954f-9cd6745a42cf.webp"
          alt="Sale"
          className="w-48 lg:w-80"
        />
      </div>
      <ProductCarousel />
    </div>
  );
};

export default ProductSale;
