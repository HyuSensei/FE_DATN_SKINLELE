import { Rate, Tag } from "antd";
import React from "react";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

const ClinicCard = ({ clinic }) => {
  if (!clinic) return null;

  return (
    <div className="px-4 py-4">
      <motion.div
        className="h-[600px] bg-white rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 flex flex-col"
        whileHover={{ y: -5 }}
      >
        {/* Banner Section - Fixed Height */}
        <div className="relative h-[280px]">
          <img
            src={clinic.banners[0].url}
            alt={clinic.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-4">
              <img
                src={clinic.logo.url}
                alt="logo-clinic"
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
              />
              <h3 className="text-xl font-bold text-white line-clamp-2">
                {clinic.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Content Section - Flexible Height */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Rating Section */}
          <div className="flex items-center gap-2 mb-4">
            <Rate disabled defaultValue={clinic.rating} className="text-sm" />
            <span className="text-gray-600 text-sm">
              ({clinic.reviews} đánh giá)
            </span>
          </div>

          {/* Tags Section - Fixed Height */}
          <div className="h-[60px] overflow-hidden mb-4">
            <div className="flex flex-wrap gap-2">
              {clinic.specialties.slice(0, 3).map((specialty, idx) => (
                <Tag
                  key={idx}
                  className="rounded-full bg-blue-50 text-blue-600 border-blue-100 m-0"
                >
                  {specialty}
                </Tag>
              ))}
              {clinic.specialties.length > 3 && (
                <Tag className="rounded-full bg-gray-50 text-gray-600 border-gray-100">
                  +{clinic.specialties.length - 3}
                </Tag>
              )}
            </div>
          </div>

          {/* Address Section - Fixed Height */}
          <div className="h-[80px] mb-4">
            <div className="flex items-start gap-3 text-gray-600">
              <FaLocationDot className="mt-1 flex-shrink-0 text-blue-500" />
              <div className="flex-1">
                <p
                  className="text-sm line-clamp-2 leading-relaxed mb-1"
                  dangerouslySetInnerHTML={{
                    __html: clinic.address,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Button Section - Fixed at Bottom */}
          <div className="mt-auto">
            <button
              onClick={() => navigate(`/clinic-detail/${clinic.slug}`)}
              className="mt-6 w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClinicCard;
