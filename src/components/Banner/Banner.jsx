import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CustomArrow = ({ direction, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "prev" ? "left-4" : "right-4"
      } z-10 cursor-pointer bg-white bg-opacity-70 rounded-full p-3 shadow-lg`}
      onClick={onClick}
    >
      {direction === "prev" ? (
        <FaChevronLeft className="text-gray-800 text-2xl" />
      ) : (
        <FaChevronRight className="text-gray-800 text-2xl" />
      )}
    </motion.div>
  );
};

const CustomDot = ({ onClick, active }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
      animate={{ scale: active ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-3 h-3 mx-2 rounded-full ${
        active ? "bg-white" : "bg-gray-400 bg-opacity-50"
      }`}
      onClick={onClick}
    />
  );
};

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    appendDots: (dots) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ position: "absolute", bottom: "20px", width: "100%" }}
      >
        <ul
          style={{
            margin: "0px",
            padding: "0px",
            textAlign: "center",
          }}
        >
          {dots}
        </ul>
      </motion.div>
    ),
    customPaging: (i) => <CustomDot />,
    dotsClass: "slick-dots",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col lg:flex-row gap-4"
    >
      <motion.div
        className="flex-grow lg:w-[70%] relative overflow-hidden rounded-lg shadow-2xl"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Slider {...settings}>
          <AnimatePresence mode="wait">
            <motion.div
              key="slide1"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="focus:outline-none"
            >
              <img
                src="https://image.hsv-tech.io/1920x0/bbx/common/398416df-9467-41eb-92f4-290265aebe88.webp"
                alt="Slide 1"
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key="slide2"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="focus:outline-none"
            >
              <img
                src="https://image.hsv-tech.io/1920x0/bbx/common/89ba4f97-5d6b-46e6-929c-c39f3691a801.webp"
                alt="Slide 2"
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key="slide3"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="focus:outline-none"
            >
              <img
                src="https://image.hsv-tech.io/1920x0/bbx/common/2684287e-5db5-4592-8aae-c42617c34958.webp"
                alt="Slide 2"
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key="slide2"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="focus:outline-none"
            >
              <img
                src="https://image.hsv-tech.io/1920x0/bbx/common/89c6ee4b-3e6e-4997-a240-6ea1a5dfb195.webp"
                alt="Slide 2"
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
        </Slider>
      </motion.div>
      <div className="flex flex-col lg:w-[30%] gap-4">
        <motion.div
          className="flex-1 hidden lg:block overflow-hidden rounded-lg shadow-xl"
          whileHover={{ scale: 1.08, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <img
            src="https://image.hsv-tech.io/1920x0/bbx/common/91100f69-0b20-48e8-a391-3d60c849e048.webp"
            alt="Image 1"
            className="w-full h-full rounded-lg transform hover:scale-110 transition duration-500"
          />
        </motion.div>
        <motion.div
          className="flex-1 hidden lg:block overflow-hidden rounded-lg shadow-xl"
          whileHover={{ scale: 1.08, rotate: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <img
            src="https://image.hsv-tech.io/1920x0/bbx/common/ec4a06da-581b-4501-b9ee-2572cebce60c.webp"
            alt="Image 2"
            className="w-full h-full rounded-lg transform hover:scale-110 transition duration-500"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;
