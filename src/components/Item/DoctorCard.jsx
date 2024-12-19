import { Avatar } from "antd";
import React from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import StarReview from "../StarReview";

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="px-4 py-2">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
        <div className="relative pb-6">
          <div className="h-28 bg-gradient-to-r from-blue-500 to-cyan-400 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 opacity-20">
              <svg viewBox="0 0 1440 320" className="w-full">
                <path
                  fill="currentColor"
                  d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
            <Avatar
              src={doctor.avatar.url}
              alt={doctor.name}
              className="w-24 h-24 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="px-6 pt-14 pb-6">
          <h3 className="flex items-center gap-2 justify-center text-lg font-semibold text-center line-clamp-1 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            BS. {doctor.name} <MdVerified className="text-[#5ad7ff]" />
          </h3>

          <div className="flex items-center justify-center gap-2 mt-2 text-blue-600 font-medium">
            <span className="text-sm">{doctor.specialty}</span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 justify-center text-gray-600">
              <span className="text-sm">
                {doctor.experience} năm kinh nghiệm
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <StarReview rate={doctor.rating} singleMode={false} />
              {/* <span className="text-gray-500 text-sm">
                {doctor.reviewCount}
              </span> */}
            </div>
          </div>

          <div className="mt-auto">
            <Link
              to={`/doctor-detail/${doctor.slug}`}
              className="hover:text-slate-50 mt-6 w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Đặt lịch khám
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
