import React from "react";
import Slider from "react-slick";
import { Skeleton } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GiSparkles } from "react-icons/gi";
import { MdOutlineArrowOutward, MdVerified } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RecommendedDoctors = ({ data, loading, error }) => {
  if (error) return null;
  if (loading) return <Skeleton active className="my-2" />;
  if (!data?.length) return null;

  // Custom arrows
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer text-gray-500 hover:text-gray-800"
      onClick={onClick}
    >
      <FaArrowRight size={24} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer text-gray-500 hover:text-gray-800"
      onClick={onClick}
    >
      <FaArrowLeft size={24} />
    </div>
  );

  // Slick settings
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          rows: 1,
        },
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-12 bg-gray-50 rounded-xl p-4 md:p-6"
    >
      {/* Header */}
      <motion.div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 bg-yellow-100 rounded-lg"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GiSparkles className="w-6 h-6 text-yellow-600" />
          </motion.div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Bác sĩ da liễu được gợi ý từ SkinLeLe
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              Dựa trên danh mục sản phẩm có thể bạn sẽ quan tâm hãy tìm hiểu
              ngay!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Doctor List */}
      <Slider {...settings} className="relative">
        {data.map((doctor) => (
          <div key={doctor._id} className="px-2 py-2">
            <motion.div
              className="flex items-start gap-3 p-3 md:p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex-shrink-0"
              >
                <img
                  src={doctor.avatar.url}
                  alt={doctor.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-2 border-sky-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-sky-400 opacity-0 filter blur-md"
                  animate={{
                    opacity: [0, 0.2, 0],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate mb-1 flex items-center gap-1">
                  BS. {doctor.name}
                  <MdVerified className="text-blue-500 text-lg shrink-0" />
                </h4>
                <p className="text-sm text-blue-600 mb-1 truncate">
                  {doctor.specialty}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {doctor.experience} năm kinh nghiệm
                </p>

                <Link
                  to={`/doctor-detail/${doctor.slug}`}
                  className="inline-flex items-center mt-2 text-sm text-blue-500 hover:text-blue-600 group"
                >
                  <span>Tìm hiểu ngay</span>
                  <MdOutlineArrowOutward className="ml-1 group-hover:rotate-45 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default RecommendedDoctors;
