import { Rate, Spin, Tag } from "antd";
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SliderClinics = ({ clinics = [], isLoading, settings = {} }) => {
  const navigate = useNavigate();
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
            <div key={index} className="px-4 py-4">
              <motion.div
                className="h-[600px] bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 flex flex-col"
                whileHover={{ y: -5 }}
              >
                {/* Banner Section - Fixed Height */}
                <div className="relative h-[280px]">
                  <img
                    src={clinic.banners[0].url}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={clinic.logo.url}
                        alt="logo-clinic"
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <h3 className="text-xl font-bold text-white line-clamp-2">
                        {clinic.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content Section - Flexible Height */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Rating Section */}
                  <div className="flex items-center gap-2 mb-4">
                    <Rate
                      disabled
                      defaultValue={clinic.rating}
                      className="text-sm"
                    />
                    <span className="text-gray-600 text-sm">
                      ({clinic.reviews} đánh giá)
                    </span>
                  </div>

                  {/* Tags Section - Fixed Height */}
                  <div className="h-[60px] overflow-hidden mb-4">
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.slice(0, 3).map((specialty, idx) => (
                        <Tag
                          key={idx}
                          className="rounded-full bg-blue-50 text-blue-600 border-blue-100 m-0"
                        >
                          {specialty}
                        </Tag>
                      ))}
                      {clinic.specialties.length > 3 && (
                        <Tag className="rounded-full bg-gray-50 text-gray-600 border-gray-100">
                          +{clinic.specialties.length - 3}
                        </Tag>
                      )}
                    </div>
                  </div>

                  {/* Address Section - Fixed Height */}
                  <div className="h-[80px] mb-4">
                    <div className="flex items-start gap-3 text-gray-600">
                      <FaLocationDot className="mt-1 flex-shrink-0 text-blue-500" />
                      <div className="flex-1">
                        <p
                          key={index}
                          className="text-sm line-clamp-2 leading-relaxed mb-1"
                          dangerouslySetInnerHTML={{
                            __html: clinic.address,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button Section - Fixed at Bottom */}
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/clinic/${clinic.slug}`)}
                      className="w-full py-3 px-6 rounded-full font-medium text-white bg-gradient-to-r from-[#6c9bbf] via-[#6c9bbf] to-[#58b8d8] hover:shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
      </Slider>
    </Spin>
  );
};

export default SliderClinics;
