import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAverageRate } from "@/utils/createIcon";
import { formatPrice } from "@/helpers/formatPrice";
import { ChatActions } from "@/redux/chat/chat.slice";
import { setOpenModelAuth } from "@/redux/auth/auth.slice";
import {
  FaRegCommentDots,
  FaClinicMedical,
  FaRegCalendarAlt,
  FaRegClock,
} from "react-icons/fa";

const DoctorConsultationCard = ({ doctor }) => {
  const dispatch = useDispatch();
  const { socketCustomer: socket, userOnlines } = useSelector((state) => state.socket);
  const { openChat, doctorConversationSelected: conversation } = useSelector((state) => state.chat);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const isOnline = userOnlines?.some((item) => item === doctor._id);

  const handleGetConversation = (res) => {
    if (res) {
      dispatch(
        ChatActions.setDoctorConversationSelected({
          ...doctor,
          conversationId: res._id,
        })
      );
    }
  };

  useEffect(() => {
    if (socket && conversation?._id === doctor._id) {
      socket.on("resConversation", handleGetConversation);
      return () => socket.off("resConversation", handleGetConversation);
    }
  }, [socket, conversation?._id]);

  const handleStartChat = () => {
    if (!isAuthenticated) {
      dispatch(setOpenModelAuth(true));
      return;
    }
    if (socket) {
      socket.emit("getConversation", JSON.stringify([doctor._id, userInfo?._id]));
      dispatch(ChatActions.setDoctorConversationSelected(doctor));
      dispatch(
        ChatActions.setOpenChatAll({
          ...openChat,
          isChatDoctor: true,
          isConversationDoctor: false,
        })
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Status Badge */}
      {/* Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600" />
        <div className="absolute -bottom-10 left-6 p-1 bg-white rounded-xl shadow-md">
          <div className="relative">
            <img
              src={doctor.avatar.url}
              alt={doctor.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-14 px-6 pb-6">
        {/* Doctor Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <Link to={`/doctor-detail/${doctor.slug}`}>
                BS. {doctor.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full shadow-md border border-gray-100">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-500 animate-pulse" : "bg-gray-300"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isOnline ? "text-green-600" : "text-gray-500"
                }`}
              >
                {isOnline ? "Đang trực tuyến" : "Ngoại tuyến"}
              </span>
            </div>
          </div>
          <p className="text-blue-600 font-medium mt-1">{doctor.specialty}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <Rate
              disabled
              value={doctor.rating}
              character={({ index }) =>
                createAverageRate({
                  index: index + 1,
                  rate: parseFloat(doctor.rating),
                  width: "14px",
                  height: "14px",
                  activeColor: "#f4dd22",
                  nonActiveColor: "#ebe8fb",
                })
              }
            />
            <span className="text-sm text-gray-500">
              ({doctor.reviewCount} đánh giá)
            </span>
          </div>

          {/* Clinic */}
          <Link
            to={`/clinic-detail/${doctor.clinic.slug}`}
            className="flex items-center gap-2 mt-3 group"
          >
            <img
              src={doctor.clinic.logo.url}
              alt={doctor.clinic.name}
              className="w-10 h-10 rounded-full border-2 border-blue-100 group-hover:border-blue-300 transition-all duration-300"
            />
            <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
              {doctor.clinic.name}
            </span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <FaRegClock className="text-blue-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {formatPrice(doctor.fees)}đ
              </div>
              <div className="text-xs text-gray-500">Phí tư vấn</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <FaRegCalendarAlt className="text-green-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {doctor.experience}+ năm
              </div>
              <div className="text-xs text-gray-500">Kinh nghiệm</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleStartChat}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaRegCommentDots />
            <span>Tư vấn ngay</span>
          </button>
          <Link
            to={`/doctor-detail/${doctor.slug}`}
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <FaClinicMedical />
            <span>Xem chi tiết</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorConsultationCard;
