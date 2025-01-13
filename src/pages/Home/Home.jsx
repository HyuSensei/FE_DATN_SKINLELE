import React, { useMemo } from "react";
import Banner from "./Banner";
import ProductCarousel from "@components/Product/ProductCarousel";
import ProductSale from "@components/Product/ProductSale";
import SliderList from "@components/Slider/SliderList";
import { sliderBrand, sliderPromotion } from "@const/dataDefault";
import useScreen from "@hook/useScreen";
import ProductList from "@components/Product/ProductList";
import { useGetProductHomeQuery } from "@/redux/product/product.query";
import { Spin } from "antd";
import Loading from "@/components/Loading/Loading";

const Home = () => {
  const { isMobile } = useScreen();
  const { data, isLoading, isFetching } = useGetProductHomeQuery();

  const productData = useMemo(() => {
    if (data?.length === 0) return {};
    return data?.reduce((acc, item) => {
      acc[item.tag] = item.products;
      return acc;
    }, {});
  }, [data]);

  const { HOT = [], SELLING = [], NEW = [], SALE = [] } = productData || {};

  if (isLoading || isFetching) return <Loading />;

  return (
    <>
      <Banner />
      <div className="space-y-8">
        <Spin spinning={isLoading} tip="Đang tải...">
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
        </Spin>
        <SliderList {...{ slides: sliderPromotion }} />
        <Spin spinning={isLoading} tip="Đang tải...">
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
        </Spin>
        <Spin spinning={isLoading} tip="Đang tải...">
          {SALE &&
            SALE.length >= 5 &&
            (!isMobile ? (
              <ProductSale {...{ products: SALE, isLoading }} />
            ) : (
              <ProductList {...{ products: SALE, isLoading }} />
            ))}
        </Spin>
        <SliderList {...{ slides: sliderBrand }} />
      </div>
    </>
  );
};

export default Home;
