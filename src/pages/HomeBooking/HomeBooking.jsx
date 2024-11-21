import { Tag } from "antd";
import React from "react";
import { motion } from "framer-motion";

const HomeBooking = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    { number: "1.500.000 +", text: "LƯỢT TRUY CẬP/THÁNG" },
    { number: "2.000 +", text: "BÁC SĨ" },
    { number: "300.000 +", text: "NGƯỜI ĐÃ SỬ DỤNG" },
    { number: "300 +", text: "PHÒNG KHÁM" },
  ];

  return (
    <div>
      <div className="relative h-[450px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.5)), 
              url('https://images.squarespace-cdn.com/content/v1/591c613d03596e365f052329/1528897715162-PNJDO1JXGGKMEW7Q6MBY/Banner-6.jpg?format=1000w')`,
          }}
        />

        <div className="container mx-auto px-4 py-16">
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mb-4 text-4xl font-bold"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                Hợp tác cùng SkinLeLe - Clinic
              </motion.div>
              <motion.div
                className="mb-8 text-xl font-light"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                Kết nối bệnh nhân, nâng tầm thương hiệu
              </motion.div>
              <motion.button
                className="w-fit rounded-full bg-yellow-400 px-8 py-3 font-semibold text-white transition-all hover:bg-yellow-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LIÊN HỆ HỢP TÁC
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-2 gap-1 lg:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="text-3xl font-bold md:text-4xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Tag className="mt-1 opacity-80" color="#6c9bbf">
                      <div className="p-1 text-sm">{stat.text}</div>
                    </Tag>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBooking;
