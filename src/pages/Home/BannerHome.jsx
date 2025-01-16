import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";

const mockSlides = [
  {
    _id: "1",
    title: "Exploring the Mountains",
    image:
      "https://image.hsv-tech.io/1920x0/bbx/common/6cb4ca54-942a-4d80-8cd9-00c9c6b1805a.webp",
  },
  {
    _id: "2",
    title: "City Lights",
    image:
      "https://res.cloudinary.com/dt8cdxgji/image/upload/v1733565403/upload-static-skinlele/iezgb3rrzscr5jslr0fv.webp",
  },
  {
    _id: "3",
    title: "Tranquil Beach",
    image:
      "https://image.hsv-tech.io/1920x0/bbx/common/221ff84d-53ce-474f-b80f-34c0e4940115.webp",
  },
  {
    _id: "4",
    title: "Autumn Forest",
    image:
      "https://image.hsv-tech.io/1920x0/bbx/common/f55a6bbb-33a5-42f2-b30a-3efd238699ab.webp",
  },
  {
    _id: "5",
    title: "Snowy Peaks",
    image:
      "https://image.hsv-tech.io/1920x0/bbx/common/09440d9e-7afe-4bce-b2e5-310fdc8ca214.webp",
  },
];

const TripleSlider = ({ slides = mockSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideClick = useCallback((clickedIndex) => {
    setCurrentIndex(clickedIndex);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden flex items-center justify-center ">
      <div className="relative w-full max-w-[1200px] h-[300px] flex items-center justify-center perspective-1000">
        {slides.map((slide, index) => {
          const offset = (index - currentIndex + slides.length) % slides.length;
          const isActive = offset === 0;
          const isPrev = offset === -1 || offset === slides.length - 1;

          return (
            <motion.div
              key={slide._id}
              className="absolute w-[45%] h-0 pb-[20%] cursor-pointer mt-12"
              initial={false}
              animate={{
                x: isActive ? 0 : isPrev ? "-80%" : "80%",
                y: isActive ? "-70px" : "0px",
                z: isActive ? 50 : -100,
                rotateY: isActive ? 0 : isPrev ? 15 : -15,
                opacity: isActive ? 1 : 0.7,
                scale: isActive ? 1.1 : 1,
              }}
              style={{
                zIndex: isActive ? 10 : 1,
              }}
              transition={{ duration: 0.5 }}
              onClick={() => handleSlideClick(index)}
            >
              <div
                className={`absolute inset-0 ${
                  !isActive ? "grayscale" : ""
                } overflow-hidden rounded-lg shadow-lg`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white text-lg font-bold truncate">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TripleSlider;
