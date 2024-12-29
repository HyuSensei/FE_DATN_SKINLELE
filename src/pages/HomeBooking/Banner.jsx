import React from "react";
import { motion } from "framer-motion";
import SearchHeaderBooking from "@/components/Search/SearchHeaderBooking";
const Banner = () => {
  const text = "Bắt đầu hành trình chăm sóc làn da của bạn";
  const characters = text.split("");

  return (
    <div className="relative py-20 overflow-hidden h-[550px] lg:h-[600px]">
      {/* Background with animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-purple-400 to-pink-300 animate-gradient-x"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>

      {/* Left Doctor Image */}
      <motion.div
        className="absolute left-0 bottom-0 hidden lg:block"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <motion.img
          src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1733565378/upload-static-skinlele/saivtrzyttq04wmopbfr.png"
          alt="Doctor 1"
          className="h-[500px] w-auto object-cover"
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Right Doctor Image */}
      <motion.div
        className="absolute right-0 bottom-0 hidden lg:block"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1733566261/upload-static-skinlele/cud44odknmahayujszkx.png"
          alt="Doctor 2"
          className="h-[500px] w-auto object-cover"
          animate={{ y: [10, -10, 10] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 mt-20 "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl animate-bounce inline-block">✨</span>
              <span className="capitalize">
                Bắt đầu hành trình chăm sóc làn da của bạn
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-white/90 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Đội ngũ bác sĩ chuyên khoa da liễu hàng đầu sẽ đồng hành cùng bạn{" "}
              <span className="text-2xl animate-bounce inline-block">✨</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full max-w-2xl mx-auto mb-8"
            >
              <SearchHeaderBooking />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="px-8 py-4 bg-white text-[#4f637e] rounded-full font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all group"
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:mr-2 transition-all">
                  ĐẶT LỊCH KHÁM NGAY
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-all">
                  →
                </span>
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:mr-2 transition-all">
                  TƯ VẤN MIỄN PHÍ
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-all">
                  →
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
