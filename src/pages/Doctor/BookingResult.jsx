import React from "react";
import { Modal, Steps, Tag } from "antd";
import {
  FaCalendarCheck,
  FaUserDoctor,
  FaLocationDot,
  FaClock,
  FaCircleCheck,
  FaArrowLeft,
} from "react-icons/fa6";
import moment from "moment";
import { useSelector } from "react-redux";
import CustomButton from "@/components/CustomButton";
import { Link } from "react-router-dom";

const BookingResult = ({ open, onClose }) => {
  const { booking } = useSelector((state) => state.booking);
  if (!booking) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      className="rounded-2xl"
      closeIcon={null}
    >
      <div className="text-center mb-8 mt-4">
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <FaCircleCheck className="w-10 h-10 text-green-500 animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đặt lịch khám thành công!
        </h2>
        <p className="text-gray-500">
          Cảm ơn bạn đã tin tưởng và đặt lịch khám tại phòng khám của chúng tôi.
        </p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <FaUserDoctor className="text-blue-500 text-lg" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Bác sĩ</p>
                <p className="font-medium text-gray-800">
                  {booking.doctor.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <FaLocationDot className="text-blue-500 text-lg" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Địa điểm</p>
                <p className="font-medium text-gray-800">
                  {booking.clinic.name}
                </p>
                <p
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: booking.clinic.address }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <FaClock className="text-blue-500 text-lg" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Thời gian</p>
                <p className="font-medium text-gray-800">
                  {moment(booking?.date).format("DD/MM/YYYY")}
                </p>
                <p className="text-sm text-gray-600">
                  {booking?.startTime} - {booking?.endTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <FaCalendarCheck className="text-blue-500 text-lg" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Trạng thái</p>
                <Tag color="blue" className="rounded-full text-sm py-1 mt-1">
                  Đang chờ xác nhận
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Steps
        current={0}
        items={[
          {
            title: "Đặt lịch",
            description: "Hoàn tất",
          },
          {
            title: "Xác nhận",
            description: "Chờ phòng khám",
          },
          {
            title: "Thăm khám",
            description: "Chờ thực hiện",
          },
        ]}
        className="px-4 mb-8"
      />

      <div className="flex justify-between gap-4">
        <CustomButton icon={<FaArrowLeft />} onClick={onClose}>
          Quay lại
        </CustomButton>
        <Link to={"/booking-history"}>
          <CustomButton variant="primary">Xem lịch sử đặt khám</CustomButton>
        </Link>
      </div>
    </Modal>
  );
};

export default BookingResult;
