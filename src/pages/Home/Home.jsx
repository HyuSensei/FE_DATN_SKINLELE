import React, { useEffect, useMemo } from "react";
import Banner from "../../components/Banner/Banner";
import ProductCarousel from "../../components/Product/ProductCarousel";
import ProductSale from "../../components/Product/ProductSale";
import SilderHome from "../../components/Slider/SilderHome";
import { sliderBrand, sliderPromotion } from "../../const/dataDefault";
import { useDispatch, useSelector } from "react-redux";
import { getProductHome } from "../../redux/product/product.thunk";

const Home = () => {
  const dispatch = useDispatch();
  const { collections, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductHome());
  }, []);

  const productData = useMemo(() => {
    if (collections.length == 0) return {};
    return collections.reduce((acc, item) => {
      acc[item.tag] = item.products;
      return acc;
    }, {});
  }, [collections]);

  const { HOT, SELLING, NEW, SALE } = productData;

  return (
    <>
      <Banner />
      <div className="space-y-8">
        <div className="mt-8">
          {HOT && HOT.length > 0 && (
            <ProductCarousel
              {...{ title: "Sản phẩm nổi bật", products: HOT, isLoading }}
            />
          )}
        </div>
        <SilderHome {...{ slides: sliderPromotion }} />
        {NEW && NEW.length > 0 && (
          <ProductCarousel
            {...{ title: "Sản phẩm mới", products: NEW, isLoading }}
          />
        )}
        {SALE && SALE.length >= 5 && (
          <ProductSale
            {...{ title: "Sản phẩm khuyến mãi", products: SALE, isLoading }}
          />
        )}
        <SilderHome {...{ slides: sliderBrand }} />
      </div>
    </>
  );
};

export default Home;
