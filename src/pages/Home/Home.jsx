import React, { useEffect, useMemo } from "react";
import Banner from "@components/Banner/Banner";
import ProductCarousel from "@components/Product/ProductCarousel";
import ProductSale from "@components/Product/ProductSale";
import SliderList from "@components/Slider/SliderList";
import { sliderBrand, sliderPromotion } from "@const/dataDefault";
import { useDispatch, useSelector } from "react-redux";
import { getProductHome } from "@redux/product/product.thunk";
import useScreen from "@hook/useScreen";
import ProductList from "@components/Product/ProductList";

const Home = () => {
  const dispatch = useDispatch();
  const { collections, isLoading } = useSelector((state) => state.product);
  const { isMobile } = useScreen();

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
          {HOT &&
            HOT.length >= 5 &&
            (!isMobile ? (
              <ProductCarousel
                {...{ title: "Sản phẩm nổi bật", products: HOT, isLoading }}
              />
            ) : (
              <ProductList
                {...{ title: "Sản phẩm nổi bật", products: HOT, isLoading }}
              />
            ))}
        </div>
        <SliderList {...{ slides: sliderPromotion }} />
        {NEW &&
          NEW.length >= 5 &&
          (!isMobile ? (
            <ProductCarousel
              {...{ title: "Sản phẩm mới", products: NEW, isLoading }}
            />
          ) : (
            <ProductList
              {...{ title: "Sản phẩm mới", products: NEW, isLoading }}
            />
          ))}
        {SALE &&
          SALE.length >= 5 &&
          (!isMobile ? (
            <ProductSale {...{ products: SALE, isLoading }} />
          ) : (
            <ProductList {...{ products: SALE, isLoading }} />
          ))}
        <SliderList {...{ slides: sliderBrand }} />
      </div>
    </>
  );
};

export default Home;
