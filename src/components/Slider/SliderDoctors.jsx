import { Avatar, Card, Rate, Spin } from "antd";
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Slider from "react-slick";

const SliderDoctors = ({ doctors = [], isLoading, settings = {} }) => {
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
    slidesToShow: 5,
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
      <Slider {...sliderSettings} {...{ settings }}>
        {doctors.length > 0 &&
          doctors.map((doctor, index) => (
            <div key={index} className="px-4 py-2">
              <Card className="text-center shadow-md transition-shadow duration-300 w-full md:max-w-[300px]">
                <Avatar
                  src={doctor.avatar.url}
                  alt={doctor.name}
                  className="w-32 h-32"
                />
                <h3 className="text-base font-semibold line-clamp-1">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 mb-2 font-medium">
                  {doctor.specialty}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  {doctor.experience} Kinh nghiệm
                </p>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <Rate
                    disabled
                    defaultValue={doctor.averageRating}
                    className="text-sm"
                  />
                  <span className="text-gray-500 text-sm">
                    ({doctor.reviews} đánh giá)
                  </span>
                </div>
                <button className="mt-2 bg-gradient-to-r from-[#6c9bbf] via-[#6c9bbf] to-[#58b8d8] w-full py-2 rounded-full text-base font-medium text-white hover:opacity-90 transition-opacity duration-300">
                  Đặt lịch khám
                </button>
              </Card>
            </div>
          ))}
      </Slider>
    </Spin>
  );
};

export default SliderDoctors;
