import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaStar, FaClinicMedical, FaCertificate } from 'react-icons/fa';

const DermatologistBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 overflow-hidden rounded-t-lg mb-2">
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="text-white">
            <motion.h1
              className="text-xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Đội Ngũ Bác Sĩ Da Liễu Chuyên Nghiệp
            </motion.h1>
            <motion.p
              className="text-base mb-8 text-blue-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Chăm sóc sức khỏe làn da của bạn với đội ngũ bác sĩ giàu kinh
              nghiệm và được đào tạo chuyên sâu
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16">
              {[
                { icon: FaUserMd, label: "Bác sĩ chuyên khoa", value: "20+" },
                { icon: FaStar, label: "Đánh giá tích cực", value: "4.8/5" },
                { icon: FaClinicMedical, label: "Phòng khám", value: "4+" },
                { icon: FaCertificate, label: "Năm kinh nghiệm", value: "10+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <stat.icon className="mx-auto h-6 w-6 mb-2" />
                  <div className="font-bold text-xl">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right content - Image */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
              {/* <img
                src="https://dalieuhanoi.vn/wp-content/uploads/2024/07/dich-vu-tan-tam.jpg"
                alt="Đội ngũ bác sĩ da liễu"
                className="w-48 h-48 object-cover rounded-lg"
              /> */}
            </div>
            {/* Floating card */}
            <motion.div
              className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-600">
                  Đang hoạt động
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Đặt lịch khám trực tuyến 24/7 với bác sĩ chuyên khoa da liễu
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30L60 25C120 20 240 10 360 7.5C480 5 600 10 720 20C840 30 960 45 1080 48.3C1200 51.7 1320 43.3 1380 39.2L1440 35V90H1380C1320 90 1200 90 1080 90C960 90 840 90 720 90C600 90 480 90 360 90C240 90 120 90 60 90H0V30Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default DermatologistBanner;