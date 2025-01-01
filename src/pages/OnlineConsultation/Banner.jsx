import React from "react";
import { motion } from "framer-motion";
import {
  FaVideo,
  FaUserMd,
  FaClock,
  FaStar,
  FaCommentDots,
} from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";

const FeatureCard = ({ icon: Icon, title, color }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className={`${color} p-4 rounded-2xl flex items-center gap-4 shadow-lg backdrop-blur-sm`}
  >
    <Icon className="text-xl" />
    <span className="font-medium text-base">{title}</span>
  </motion.div>
);

const Banner = () => {
  return (
    <div className="relative pt-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden rounded-2xl shadow-lg">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-medium"
            >
              <BsPatchCheckFill className="text-blue-50" />
              10.000+ lượt tư vấn thành công
            </motion.div>

            <div className="space-y-4">
              <h1 className="capitalize text-3xl sm:text-4xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 text-transparent bg-clip-text">
                Tư vấn da liễu online
                <span className="block mt-1 text-blue-600">
                  từ chuyên gia hàng đầu
                </span>
              </h1>

              <p className="text-gray-600">
                Kết nối ngay với đội ngũ bác sĩ da liễu giàu kinh nghiệm qua nền
                tảng trực tuyến.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <FeatureCard
                icon={FaVideo}
                title="Tư vấn video call HD"
                color="bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700"
              />
              <FeatureCard
                icon={FaUserMd}
                title="Bác sĩ chuyên khoa"
                color="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 text-indigo-700"
              />
              <FeatureCard
                icon={FaClock}
                title="Linh hoạt 24/7"
                color="bg-gradient-to-r from-sky-500/10 to-sky-600/10 text-sky-700"
              />
              <FeatureCard
                icon={MdSecurity}
                title="Bảo mật tuyệt đối"
                color="bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700"
              />
            </div>
          </motion.div>

          {/* Right Content - Doctor Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px]"
          >
            {/* Rating Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-8 -left-6 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-xl text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Đánh giá</div>
                  <div className="font-semibold">4.9/5.0</div>
                </div>
              </div>
            </motion.div>

            {/* Doctor Image */}
            <div className="relative z-10 h-full">
              <img
                src={
                  "https://res.cloudinary.com/dt8cdxgji/image/upload/v1733566261/upload-static-skinlele/sj7kpwegqn4fgqnyb7gs.png"
                }
                alt="Doctor"
                className="h-full rounded-2xl shadow-xl"
              />
            </div>

            {/* Online Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm">45 bác sĩ đang trực tuyến</span>
              </div>
            </motion.div>

            {/* Feedback Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -bottom-4 -right-1 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaCommentDots className="text-xl text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Phản hồi tích cực</div>
                  <div className="font-semibold">98% hài lòng</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
