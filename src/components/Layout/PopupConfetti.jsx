import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { GiStarShuriken } from 'react-icons/gi';

const PopupConfetti = () => {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const animationFrameRef = useRef(null);

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
      centerY: (bounds.top + bounds.height / 2) / viewportHeight
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
      shapes: ['square', 'circle'],
      scalar: 0.8,
      zIndex: 100,
      colors,
      disableForReducedMotion: true
    });
  };

  const startContinuousConfetti = () => {
    const bounds = getPopupBounds();
    if (!bounds) return;

    // Màu sắc chủ đạo
    const colors = [
      '#FFD700', // Gold
      '#FFA500', // Orange
      '#FF69B4', // Hot Pink
      '#ff718d', // Rose
      '#ff8fa3', // Light Rose
      '#ffb3c1'  // Pale Rose
    ];

    const animate = () => {
      // Bắn từ góc trái dưới
      createConfetti(
        { x: bounds.left - 0.1, y: bounds.bottom + 0.1 },
        60,
        60,
        colors
      );

      // Bắn từ góc phải dưới
      createConfetti(
        { x: bounds.right + 0.1, y: bounds.bottom + 0.1 },
        120,
        60,
        colors
      );

      // Bắn từ hai bên cạnh
      createConfetti(
        { x: bounds.left - 0.1, y: bounds.centerY },
        0,
        80,
        colors
      );
      createConfetti(
        { x: bounds.right + 0.1, y: bounds.centerY },
        180,
        80,
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

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative bg-gradient-to-br from-rose-500 to-rose-400 rounded-xl shadow-2xl p-8 max-w-md w-full "
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100"
            >
              <MdClose size={24} className="text-rose-500" />
            </button>

            {/* Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-rose-50 rounded-full px-6 py-2 mb-3">
                <h2 className="text-xl font-medium">
                🎁 Quà tặng chính hãng
                </h2>
              </div>
            </div>

            {/* Badges */}
            {/* Badges */}
            <div className="flex justify-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center">
                <GiStarShuriken className="mr-1" /> Freeship 15k
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center">
                <GiStarShuriken className="mr-1" /> Giao 24h
              </span>
            </div>

            {/* Offers */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { min: '299k', gift: 'Son lì', value: '229k' },
                { min: '499k', gift: 'Kem chống nắng', value: '380k' },
                { min: '799k', gift: 'Bộ dưỡng da', value: '900k' },
                { min: '1500k', gift: 'Son dưỡng', value: '380k' },
              ].map((offer, index) => (
                <div
                  key={index}
                  className="bg-rose-50 p-4 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                >
                  <p className="font-bold text-gray-800">Đơn từ {offer.min}</p>
                  <p className="text-gray-600">{offer.gift}</p>
                  <p className="text-rose-500 font-bold mt-1">
                    Trị giá {offer.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/shop"
              className="block w-full bg-rose-500 hover:bg-rose-600 text-white text-center py-3 rounded-lg font-bold text-lg transition-colors transform hover:scale-105 duration-200 shadow-lg hover:shadow-xl"
            >
              Mua ngay
            </Link>

            <p className="text-center text-white text-sm mt-4 font-medium">
              Chỉ có tại SkinLeLe !
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupConfetti;