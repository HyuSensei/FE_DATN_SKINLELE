import { Avatar, Rate, Spin } from "antd";
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdVerified,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaBriefcaseMedical } from "react-icons/fa";

const SliderDoctors = ({ doctors = [], isLoading = false, settings = {} }) => {
  const navigate = useNavigate();

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
            <div key={index} className="px-4 py-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                {/* Card Header with Avatar */}
                <div className="relative pb-6">
                  <div className="h-28 bg-gradient-to-r from-blue-500 to-cyan-400 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 opacity-20">
                      <svg viewBox="0 0 1440 320" className="w-full">
                        <path
                          fill="currentColor"
                          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
                    <Avatar
                      src={doctor.avatar.url}
                      alt={doctor.name}
                      className="w-24 h-24 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pt-14 pb-6">
                  <h3 className="flex items-center gap-2 justify-center text-lg font-semibold text-center line-clamp-1 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    BS. {doctor.name} <MdVerified className="text-[#5ad7ff]" />
                  </h3>

                  <div className="flex items-center justify-center gap-2 mt-2 text-blue-600 font-medium">
                    <FaBriefcaseMedical className="w-4 h-4" />
                    <span className="text-sm">{doctor.specialty}</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 justify-center text-gray-600">
                      <span className="text-sm">
                        {doctor.experience} năm kinh nghiệm
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Rate
                        disabled
                        defaultValue={doctor.averageRating}
                        className="text-sm text-yellow-400"
                      />
                      <span className="text-gray-500 text-sm">
                        {doctor.reviews}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/doctor/${doctor.slug}`)}
                    className="mt-6 w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Đặt lịch khám
                  </button>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </Spin>
  );
};

export default SliderDoctors;
