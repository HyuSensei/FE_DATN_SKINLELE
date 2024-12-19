import { Rate, Spin, Tag } from "antd";
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Slider from "react-slick";
import ClinicCard from "../Item/ClinicCard";

const SliderClinics = ({ clinics = [], isLoading = false, settings = {} }) => {
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#f9fafc] rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 focus:outline-none"
    >
      <MdOutlineArrowForwardIos className="w-5 h-5" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#f9fafc] rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 focus:outline-none"
    >
      <MdOutlineArrowBackIos className="w-5 h-5" />
    </button>
  );

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Slider
        {...sliderSettings}
        {...{ settings }}
        className="clinic-slider -mx-4"
      >
        {clinics.length > 0 &&
          clinics.map((clinic, index) => (
            <ClinicCard key={index} clinic={clinic} />
          ))}
      </Slider>
    </Spin>
  );
};

export default SliderClinics;
