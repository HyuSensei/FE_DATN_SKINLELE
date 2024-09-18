import React from "react";
import Slider from "react-slick";
import { defaultProduct } from "../../const/defaultProduct";
import { formatPrice } from "../../helpers/formatPrice";
import { Rate, Spin } from "antd";
import { createIcon } from "../../ultis/createIcon";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import ImageCarousel from "../ImageCarousel";
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({ products = defaultProduct, isLoading, title }) => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
          <FaChevronLeft className="text-gray-800 text-xl" />
        ) : (
          <FaChevronRight className="text-gray-800 text-xl" />
        )}
      </motion.div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
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

  const Loading = () => (
    <div className="flex items-center justify-center m-4">
      <Spin size="large" />
    </div>
  );

  if (isLoading) return Loading();

  if (products.length === 0) return null;

  return (
    <div className="relative px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto px-4 py-4 md:px-8"
      >
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="texl lg:text-3xl font-bold uppercase text-center"
          >
            {title}
          </motion.h2>
        )}
      </motion.div>
      <Slider {...settings}>
        {products.map((item, index) => (
          <div key={index} className="px-2">
            <div
              onClick={() => navigate(`/detail/${item.slug}`)}
              className="cursor-pointer flex flex-col h-full bg-white pt-2 hover:py-6 pb-4 px-2 rounded-md"
            >
              <ImageCarousel
                images={[item.mainImage, ...(item.images || [])].filter(
                  (img) => img && img.url
                )}
                name={item.name}
              />
              <div className="font-bold text-sm pt-2 text-center">
                {item.brand.name}
              </div>
              <div className="mt-2 flex-grow">
                <h3 className="text-xs line-clamp-2 items-center leading-5">
                  {item.name}
                </h3>
                <div className="mt-2 flex items-center justify-center gap-4">
                  <span className="font-bold text-sm">
                    {formatPrice(item.price)}đ
                  </span>
                  <span className="text-slate-400 line-through text-sm">
                    {formatPrice(item.price * 1.3)}đ
                  </span>
                </div>
                <div className="py-2 flex items-center justify-center gap-2">
                  <Rate
                    disabled
                    character={({ index }) =>
                      createIcon({
                        index: index + 1,
                        rate: 5,
                        width: "12px",
                        height: "12px",
                      })
                    }
                  />
                  <span className="font-medium">(0)</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
