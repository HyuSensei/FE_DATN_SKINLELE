import React from "react";
import { Skeleton } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GiSparkles } from "react-icons/gi";
import { MdOutlineArrowOutward, MdVerified } from "react-icons/md";

const RecommendedDoctors = ({ data, loading, error }) => {
  if (error) return null;
  if (loading) return <Skeleton active className="my-2" />;
  if (!data?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-12 bg-gray-50 rounded-xl p-4 md:p-6"
    >
      {/* Header */}
      <motion.div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 bg-yellow-100 rounded-lg"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GiSparkles className="w-6 h-6 text-yellow-600" />
          </motion.div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Bác sĩ da liễu được gợi ý từ SkinLeLe
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              Dựa trên danh mục sản phẩm có thể bạn sẽ quan tâm hãy tìm hiểu
              ngay !
            </p>
          </div>
        </div>
      </motion.div>

      {/* Doctor List */}
      <motion.div
        className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar-doctor pb-4 -mx-4 px-4 md:-mx-6 md:px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {data.map((doctor) => (
          <motion.div
            key={doctor._id}
            className="flex-shrink-0 w-[400px] md:w-[450px]"
            variants={{
              hidden: { x: 50, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start gap-3 p-3 md:p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex-shrink-0"
              >
                <img
                  src={doctor.avatar.url}
                  alt={doctor.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-2 border-sky-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-sky-400 opacity-0 filter blur-md"
                  animate={{
                    opacity: [0, 0.2, 0],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate mb-1 flex items-center gap-1">
                  BS. {doctor.name}
                  <MdVerified className="text-blue-500 text-lg shrink-0" />
                </h4>
                <p className="text-sm text-blue-600 mb-1 truncate">
                  {doctor.specialty}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {doctor.experience} năm kinh nghiệm
                </p>

                <Link
                  to={`/doctor-detail/${doctor.slug}`}
                  className="inline-flex items-center mt-2 text-sm text-blue-500 hover:text-blue-600 group"
                >
                  <span>Tìm hiểu ngay</span>
                  <MdOutlineArrowOutward className="ml-1 group-hover:rotate-45 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecommendedDoctors;
