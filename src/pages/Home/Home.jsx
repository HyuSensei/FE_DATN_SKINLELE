import React from "react";
import Banner from "../../components/Banner/Banner";
import ProductList from "../../components/Product/ProductList";
import ProductCarousel from "../../components/Product/ProductCarousel";
import ProductSale from "../../components/Product/ProductSale";
import SilderHome from "../../components/Slider/SilderHome";
import { sliderBrand, sliderPromotion } from "../../const/dataDefault";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="space-y-8">
        <div className="mt-8">
          <ProductCarousel {...{ title: "Top sản phẩm bán chạy" }} />
        </div>
        <SilderHome {...{ slides: sliderPromotion }} />
        <ProductSale />
        <SilderHome {...{ slides: sliderBrand }} />
        <ProductList {...{ isPagination: false }} />
      </div>
    </>
  );
};

export default Home;
