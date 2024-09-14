import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const SilderHome = ({ slides }) => {
  const CustomArrow = ({ direction, onClick }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-1/2 -translate-y-1/2 ${
          direction === "prev" ? "-left-4" : "-right-4"
        } z-10 cursor-pointer bg-white bg-opacity-70 rounded-full p-3 shadow-lg`}
        onClick={onClick}
      >
        {direction === "prev" ? (
          <FaChevronLeft className="text-gray-800 text-xl" />
        ) : (
          <FaChevronRight className="text-gray-800 text-xl" />
        )}
      </motion.div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <motion.div
      className="mx-auto px-8 py-4"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.key} className="px-2 focus:outline-none">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default SilderHome;
