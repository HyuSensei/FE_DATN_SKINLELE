import React from "react";
import { Steps, Timeline, Tag, Avatar } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetBookingDetailByUserQuery } from "@/redux/booking/booking.query";
import EmptyData from "@/components/Error/EmptyData";
import LoadingClinic from "@/components/Loading/LoadingClinic";
import dayjs from "@utils/dayjsTz";
import {
  FaRegCalendarCheck,
  FaRegClock,
  FaRegUser,
  FaPhoneAlt,
  FaRegEnvelope,
  FaRegMoneyBillAlt,
  FaStickyNote,
} from "react-icons/fa";

const statusColors = {
  pending: "#f97316",
  confirmed: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

const statusStyles = {
  pending: "bg-orange-50 border-orange-200 text-orange-700",
  confirmed: "bg-blue-50 border-blue-200 text-blue-700",
  completed: "bg-green-50 border-green-200 text-green-700",
  cancelled: "bg-red-50 border-red-200 text-red-700",
};

const statusSteps = {
  pending: 0,
  confirmed: 1,
  completed: 2,
  cancelled: 3,
};

const InfoCard = ({ title, children, className = "" }) => (
  <div
    className={`bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100 ${className}`}
  >
    <h2 className="text-lg font-semibold mb-6">{title}</h2>
    {children}
  </div>
);

const InfoItem = ({ icon: Icon, label, value, className = "" }) => (
  <div
    className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-200 hover:bg-gray-50 ${className}`}
  >
    <Icon className="text-blue-500 mt-1 flex-shrink-0 w-5 h-5" />
    <div className="flex-1 min-w-0">
      <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
      <p className="text-gray-900 font-medium break-words">{value}</p>
    </div>
  </div>
);

const BookingDetailUser = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { id } = useParams();

  const {
    data: booking,
    isLoading,
    isFetching,
  } = useGetBookingDetailByUserQuery({ id }, { skip: !isAuthenticated || !id });

  if (isLoading || isFetching) return <LoadingClinic />;
  if (!isLoading && !booking)
    return <EmptyData description="Không tìm thấy lịch khám" />;

  const renderStatus = () => {
    const statuses = ["Chờ xác nhận", "Đã xác nhận", "Hoàn thành", "Đã hủy"];
    const items = statuses.map((title) => ({ title }));

    return (
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100">
        <div className="mb-4">
          <Tag
            className={`px-4 py-1 border-2 font-medium ${
              statusStyles[booking.status]
            }`}
          >
            {booking.status === "pending" && "Chờ xác nhận"}
            {booking.status === "confirmed" && "Đã xác nhận"}
            {booking.status === "completed" && "Hoàn thành"}
            {booking.status === "cancelled" && "Đã hủy"}
          </Tag>
        </div>
        <Steps
          current={statusSteps[booking.status]}
          status={booking.status === "cancelled" ? "error" : "process"}
          items={items}
          className="px-4"
          progressDot
        />
      </div>
    );
  };

  const renderClinicAndDoctor = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-start space-x-4">
          <Avatar
            size={64}
            src={booking.clinic.logo?.url}
            alt={booking.clinic.name}
            className="flex-shrink-0 border-2 border-gray-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {booking.clinic.name}
            </h3>
            <p
              className="text-gray-500 text-sm mb-2"
              dangerouslySetInnerHTML={{ __html: booking.clinic.address }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-start space-x-4">
          <Avatar
            size={64}
            src={booking.doctor.avatar?.url}
            alt={booking.doctor.name}
            className="flex-shrink-0 border-2 border-gray-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              BS. {booking.doctor.name}
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              {booking.doctor.specialty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingInfo = () => (
    <InfoCard title="Thông tin lịch khám">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InfoItem
          icon={FaRegCalendarCheck}
          label="Ngày khám"
          value={dayjs(booking.date).format("dddd, DD/MM/YYYY")}
        />
        <InfoItem
          icon={FaRegClock}
          label="Thời gian"
          value={`${booking.startTime} - ${booking.endTime}`}
        />
        <InfoItem
          icon={FaRegMoneyBillAlt}
          label="Chi phí khám"
          value={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(booking.price)}
        />
        {booking.note && (
          <InfoItem
            icon={FaStickyNote}
            label="Ghi chú"
            value={booking.note}
            className="md:col-span-2"
          />
        )}
      </div>
    </InfoCard>
  );

  const renderPatientInfo = () => (
    <InfoCard title="Thông tin bệnh nhân">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InfoItem
          icon={FaRegUser}
          label="Họ tên"
          value={booking.customer.name}
        />
        <InfoItem
          icon={FaPhoneAlt}
          label="Số điện thoại"
          value={booking.customer.phone}
        />
        <InfoItem
          icon={FaRegEnvelope}
          label="Email"
          value={booking.customer.email}
          className="md:col-span-2"
        />
      </div>
    </InfoCard>
  );

  const renderTimeline = () => (
    <InfoCard title="Lịch sử đặt khám">
      <Timeline
        items={booking.statusHistory.map((history) => ({
          color: statusColors[history.status],
          children: (
            <div className="group">
              <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {history.status === "pending" && "Đặt lịch khám"}
                {history.status === "confirmed" && "Xác nhận lịch khám"}
                {history.status === "completed" && "Hoàn thành khám"}
                {history.status === "cancelled" && "Hủy lịch khám"}
              </div>
              <div className="text-sm text-gray-500">
                {dayjs(history.date).format("HH:mm - DD/MM/YYYY")}
              </div>
            </div>
          ),
        }))}
      />
    </InfoCard>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Chi tiết lịch khám
        </h1>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
          Mã lịch khám: <span className="uppercase px-2"> BK{booking._id}</span>
        </div>
      </div>

      {renderStatus()}
      {renderClinicAndDoctor()}
      {renderBookingInfo()}
      {renderPatientInfo()}
      {renderTimeline()}
    </div>
  );
};

export default BookingDetailUser;
