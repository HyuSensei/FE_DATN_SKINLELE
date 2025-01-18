import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useGetPromotionActiveQuery } from "@/redux/product/product.query";
import Loading from "../Loading/Loading";
import { formatPrice } from "@/helpers/formatPrice";
import { useEffect, useRef, useState } from "react";

const PopupConfetti = () => {
  const { data: promotions, isLoading } = useGetPromotionActiveQuery();
  const [isVisible, setIsVisible] = useState(false);
  const [randomPromotion, setRandomPromotion] = useState(null);
  const popupRef = useRef(null);
  const animationFrameRef = useRef(null);

  const getRandomPromotion = (promotions) => {
    if (!promotions?.length) return null;
    const index = Math.floor(Math.random() * promotions.length);
    return promotions[index];
  };

  useEffect(() => {
    if (promotions?.length) {
      setRandomPromotion(getRandomPromotion(promotions));
    }
  }, [promotions]);

  const getPopupBounds = () => {
    if (!popupRef.current) return null;
    const bounds = popupRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    return {
      left: bounds.left / viewportWidth,
      right: bounds.right / viewportWidth,
      top: bounds.top / viewportHeight,
      bottom: bounds.bottom / viewportHeight,
      width: bounds.width,
      height: bounds.height,
      centerX: (bounds.left + bounds.width / 2) / viewportWidth,
      centerY: (bounds.top + bounds.height / 2) / viewportHeight,
    };
  };

  const createConfetti = (origin, angle, spread, colors) => {
    confetti({
      origin,
      angle,
      spread,
      particleCount: 15,
      startVelocity: 25,
      gravity: 0.8,
      ticks: 150,
      shapes: ["square", "circle"],
      scalar: 0.8,
      zIndex: 100,
      colors,
      disableForReducedMotion: true,
    });
  };

  const startContinuousConfetti = () => {
    const bounds = getPopupBounds();
    if (!bounds) return;

    const colors = [
      "#FFD700",
      "#FFA500",
      "#FF69B4",
      "#ff718d",
      "#ff8fa3",
      "#ffb3c1",
    ];

    const animate = () => {
      createConfetti(
        { x: bounds.left - 0.1, y: bounds.bottom + 0.1 },
        60,
        60,
        colors
      );
      createConfetti(
        { x: bounds.right + 0.1, y: bounds.bottom + 0.1 },
        120,
        60,
        colors
      );
      animationFrameRef.current = setTimeout(animate, 300);
    };

    animate();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (animationFrameRef.current) {
        clearTimeout(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      startContinuousConfetti();
    }
    return () => {
      if (animationFrameRef.current) {
        clearTimeout(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  if (isLoading) return <Loading />;
  if (!randomPromotion) return null;

  const remainingTimeMs =
    new Date(randomPromotion.endDate).getTime() - new Date().getTime();
  const days = Math.floor(remainingTimeMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative p-8 max-w-lg w-full bg-white rounded-2xl shadow-2xl bg-gradient-to-r from-rose-100 via-rose-200 to-rose-300"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100"
            >
              <MdClose size={24} className="text-rose-500" />
            </button>

            {/* Thông tin khuyến mãi */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-rose-50 rounded-full px-6 py-2 mb-3">
                <h2 className="text-xl font-bold text-rose-600">
                  🎁 {randomPromotion.name}
                </h2>
              </div>
            </div>

            {/* Countdown */}
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-rose-500">
                {days} ngày {hours} giờ
              </p>
            </div>

            {/* Banner */}
            {randomPromotion.banner?.url && (
              <div className="mb-6">
                <img
                  src={randomPromotion.banner.url}
                  alt={randomPromotion.name}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Sản phẩm khuyến mãi */}
            <div className="mb-6 max-h-48 overflow-y-auto hide-scrollbar-custom">
              {randomPromotion.products.slice(0, 3).map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.product.mainImage.url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-rose-500 font-bold">
                        {formatPrice(item.discountedPrice)}đ
                      </span>
                      <span className="text-gray-500 text-sm line-through">
                        {formatPrice(item.product.price)}đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/promotions"
              className="block w-full bg-rose-500 hover:bg-rose-600 text-white text-center py-3 rounded-lg font-bold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Mua ngay - Giảm đến{" "}
              {randomPromotion.products[0].discountPercentage}%
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupConfetti;
