import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdClose,
    MdChevronRight,
    MdSearch,
    MdLocationCity
} from 'react-icons/md';
import {
    FaShieldAlt,
    FaClock,
    FaStar,
    FaUsers,
    FaHospital,
    FaStethoscope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoSparkles } from 'react-icons/io5';

const StatBadge = ({ icon: Icon, count, text }) => (
    <div className="flex items-center space-x-1">
        <Icon size={14} className="text-rose-500" />
        <span className="text-xs font-semibold text-rose-600">{count}</span>
        <span className="text-xs text-gray-600">{text}</span>
    </div>
);

const FeaturePill = ({ icon: Icon, text }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center bg-white rounded-full px-2 py-1"
    >
        <Icon size={12} className="text-rose-400 mr-1" />
        <span className="text-xs text-gray-700">{text}</span>
    </motion.div>
);

const PopupClinic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasInteracted) {
                setIsOpen(true);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [hasInteracted]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        setHasInteracted(true);
    };

    if (!isVisible) return null;

    const BeautySparkle = ({ delay, x, y }) => (
        <motion.div
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 90, 180]
            }}
            transition={{
                duration: 2,
                delay,
                repeat: Infinity,
                repeatDelay: 3
            }}
        >
            <IoSparkles size={24} className="text-rose-300" />
        </motion.div>
    );

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, x: -100, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, y: 100, scale: 0.8 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="relative bg-gradient-to-br from-white to-rose-50 rounded-xl shadow-2xl p-6 max-w-sm border border-rose-100"
                    >
                        <BeautySparkle delay={0} x={10} y={20} />
                        <BeautySparkle delay={0.5} x={90} y={30} />
                        <BeautySparkle delay={1} x={20} y={80} />
                        <BeautySparkle delay={1.5} x={80} y={70} />
                        {/* Header with logo and stats */}
                        <div className="relative">
                            <div className="flex justify-between items-start">
                                <motion.div
                                    className="flex items-center bg-gradient-to-r from-rose-500 to-rose-400 text-white px-3 py-1.5 rounded-lg shadow-lg"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                >
                                    <FaHospital className="w-4 h-4 mr-1.5" />
                                    <span className="font-semibold text-sm">SkinLeLe Clinic</span>
                                </motion.div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <MdClose size={16} />
                                </button>
                            </div>

                            <p className="text-xs py-2 text-gray-600 font-medium italic">
                                "Chăm sóc làn da của bạn - Nâng tầm vẻ đẹp tự nhiên"
                            </p>

                            {/* Quick stats */}
                            <motion.div
                                className="flex justify-between mt-3 mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <StatBadge icon={FaShieldAlt} count="100+" text="Phòng khám" />
                                <StatBadge icon={FaStar} count="4.9" text="Đánh giá" />
                            </motion.div>
                        </div>

                        {/* Features */}
                        <motion.div
                            className="flex flex-wrap gap-1.5 my-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <FeaturePill icon={FaClock} text="Đặt lịch 24/7" />
                            <FeaturePill icon={FaUsers} text="10000+ Khách hàng" />
                            <FeaturePill icon={FaStethoscope} text="Bác sĩ chuyên khoa" />
                        </motion.div>

                        {/* Promotion text */}
                        <motion.p
                            className="text-xs text-gray-600 mb-3 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            ✨ Trải nghiệm đặt lịch thông minh & tư vấn miễn phí
                            <br />
                            💫 Kết nối với phòng khám da liễu uy tín hàng đầu
                        </motion.p>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-rose-500 to-rose-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2"
                            onClick={() => window.location.href = '/home-booking'}
                        >
                            <MdSearch size={16} />
                            <Link to={"/home-booking"}>Tìm phòng khám ngay</Link>
                            <motion.div
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <MdChevronRight size={16} />
                            </motion.div>
                        </motion.button>

                        {/* Floating tag */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute animate-bounce -top-2 -right-2 bg-yellow-200 text-xs font-medium text-gray-700 px-2 py-0.5 rounded-full shadow-sm"
                        >
                            🔥 HOT
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleToggle}
                        className="relative"
                    >
                        <motion.div
                            className="absolute inset-0 bg-rose-500 rounded-full opacity-20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-3 rounded-full shadow-lg">
                            <MdLocationCity className="w-5 h-5 text-white" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PopupClinic;