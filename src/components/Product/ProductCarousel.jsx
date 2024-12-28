import React from "react";
import Slider from "react-slick";
import { defaultProduct } from "@const/defaultProduct";
import { formatPrice } from "@helpers/formatPrice";
import { Rate, Spin, Tag } from "antd";
import { createAverageRate } from "@utils/createIcon";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import ImageCarousel from "@components/ImageCarousel";
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({
  products = defaultProduct,
  isLoading,
  title,
  show = 5,
  auto = true,
  scroll = 1,
}) => {
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
    slidesToShow: show,
    slidesToScroll: scroll,
    autoplay: auto,
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

  if (isLoading) return <LoadingContent />;

  if (products.length === 0 && !isLoading) return null;

  const ProductItem = ({ item }) => {
    const discountPercentage = item.promotion
      ? item.promotion.discountPercentage
      : 0;
    const originalPrice = item.originalPrice || item.price;
    const discountedPrice = item.price;

    return (
      <div className="px-2 py-2">
        <div
          onClick={() => navigate(`/detail/${item.slug}`)}
          className="cursor-pointer flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div className="relative">
            <ImageCarousel
              images={[item.mainImage, ...(item.images || [])].filter(
                (img) => img && img.url
              )}
              name={item.name}
            />
            {discountPercentage > 0 && (
              <Tag color="#f50" className="absolute top-2 left-2 z-10">
                -{discountPercentage}%
              </Tag>
            )}
          </div>
          <div className="p-4">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-sm text-center uppercase">
              {item.brand.name}
            </div>
            <h3 className="text-xs line-clamp-2 items-center leading-5 mb-1">
              {item.name}
            </h3>
            <div
              className={`flex items-center ${
                discountPercentage > 0 ? "justify-between" : "justify-center"
              } mb-2`}
            >
              <span className="font-bold">{formatPrice(discountedPrice)}đ</span>
              {discountPercentage > 0 && (
                <span className="text-gray-400 line-through text-sm">
                  {formatPrice(originalPrice)}đ
                </span>
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Rate
                disabled
                value={parseFloat(item.averageRating)}
                character={({ index }) =>
                  createAverageRate({
                    index: index + 1,
                    rate: parseFloat(item.averageRating),
                    width: "12px",
                    height: "12px",
                  })
                }
              />
              <span className="text-sm text-gray-500">
                ({item.totalReviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative px-6 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto px-4 pb-6 md:px-8"
      >
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base lg:text-3xl font-bold text-center text-gray-800 uppercase"
          >
            {title}
          </motion.h2>
        )}
      </motion.div>
      <Slider {...settings}>
        {products.map((item, index) => (
          <ProductItem key={index} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
