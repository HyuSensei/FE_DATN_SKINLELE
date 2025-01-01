import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Rate, Tag, Tooltip } from "antd";
import { MdVerified } from "react-icons/md";
import { FaFacebookMessenger, FaRegEye } from "react-icons/fa6";
import CustomButton from "@/components/CustomButton";
import { createAverageRate } from "@/utils/createIcon";
import { formatPrice } from "@/helpers/formatPrice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "@/redux/chat/chat.slice";
import { setOpenModelAuth } from "@/redux/auth/auth.slice";

const DoctorConsultationCard = ({ doctor }) => {
  const dispatch = useDispatch();
  const { socketCustomer: socket, userOnlines } = useSelector(
    (state) => state.socket
  );
  const { openChat, doctorConversationSelected: conversation } = useSelector(
    (state) => state.chat
  );
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const isOnline = () => {
    return userOnlines?.some((item) => item === doctor._id);
  };

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
      return () => {
        socket.off("resConversation", handleGetConversation);
      };
    }
  }, [socket, conversation?._id]);

  const handleSelectConversation = () => {
    if (!isAuthenticated) {
      dispatch(setOpenModelAuth(true));
      return;
    }
    if (socket) {
      socket.emit(
        "getConversation",
        JSON.stringify([doctor._id, userInfo?._id])
      );
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
      className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-800 h-32 relative">
          <div className="absolute -bottom-16 left-6 bg-white rounded-xl p-1 shadow-lg">
            <img
              src={doctor.avatar.url}
              alt={doctor.name}
              className="w-28 h-28 object-cover rounded-lg"
            />
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline() ? "bg-green-400 animate-pulse" : "bg-yellow-400"
                  } `}
                />
                <span
                  className={`text-sm ${
                    isOnline() ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {isOnline() ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-20 pb-6 px-6">
          {/* Doctor Info */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900">
                BS. {doctor.name}
              </h3>
              <MdVerified className="text-blue-500 text-xl" />
            </div>
            <div className="text-base font-medium text-blue-500">
              {doctor.specialty}
            </div>

            <div className="flex items-center gap-2">
              <Rate
                disabled
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
              <span className="text-gray-500">
                ({doctor.reviewCount} đánh giá)
              </span>
            </div>
            <Link to={`/clinic-detail/${doctor.clinic.slug}`}>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={doctor.clinic.logo.url}
                  alt={doctor.clinic.name}
                  className="w-12 h-12 border-2 rounded-full border-sky-300 shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="text-sm text-gray-600 truncate-2-lines">
                  {doctor.clinic.name}
                </div>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">
                {formatPrice(doctor.fees)}đ
              </div>
              <div className="text-xs text-gray-600">Giá khám</div>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                {doctor.experience} +
              </div>
              <div className="text-xs text-gray-600">Kinh nghiệm</div>
            </div>
          </div>

          {/* Schedule Button */}
          <div className="flex gap-3">
            <CustomButton
              onClick={handleSelectConversation}
              className="flex-1"
              variant="primary"
              icon={<FaFacebookMessenger className="text-lg" />}
            >
              Tư vấn ngay
            </CustomButton>
            <Tooltip title="Xem thêm thông tin">
              <Link to={`/doctor-detail/${doctor.slug}`}>
                <Button className="h-11 w-11 flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 border-2 border-blue-100">
                  <FaRegEye className="text-2xl" />
                </Button>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorConsultationCard;
