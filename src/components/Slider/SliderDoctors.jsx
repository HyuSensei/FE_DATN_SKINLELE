import { Spin } from "antd";
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Slider from "react-slick";
import DoctorCard from "../Item/DoctorCard";

const SliderDoctors = ({ doctors = [], isLoading = false, settings = {} }) => {
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 focus:outline-none"
    >
      <MdOutlineArrowForwardIos className="w-6 h-6" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white hover:scale-110 transition-all duration-300 focus:outline-none"
    >
      <MdOutlineArrowBackIos className="w-6 h-6" />
    </button>
  );

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
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
      <Slider {...sliderSettings} {...settings}>
        {doctors.length > 0 &&
          doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
      </Slider>
    </Spin>
  );
};

export default SliderDoctors;
