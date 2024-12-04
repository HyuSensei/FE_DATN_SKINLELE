import React, { useState } from "react";
import { Card, Tag, Empty, Radio, Divider } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  EditOutlined,
  CheckCircleFilled,
  MedicineBoxOutlined,
  StarFilled,
} from "@ant-design/icons";
import CustumButton from "@components/CustumButton/CustumButton";

const BookingHistory = () => {
  const [activeStatus, setActiveStatus] = useState("all");

  const bookings = [
    {
      id: 1,
      customer: {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        email: "nguyenvana@gmail.com",
        dateOfBirth: "1990-01-01",
        gender: "Nam",
        address: "123 Đường ABC, Quận 1, TP.HCM",
      },
      doctor: {
        name: "Bs. Trần Văn B",
        specialty: "Tim mạch",
      },
      date: "2024-03-20",
      startTime: "09:00",
      endTime: "09:30",
      status: "completed",
      price: "500000",
      note: "Khám định kỳ",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      customer: {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        email: "nguyenvana@gmail.com",
        dateOfBirth: "1990-01-01",
        gender: "Nam",
        address: "123 Đường ABC, Quận 1, TP.HCM",
      },
      doctor: {
        name: "Bs. Lê Thị C",
        specialty: "Da liễu",
      },
      date: "2024-03-25",
      startTime: "14:00",
      endTime: "14:30",
      status: "pending",
      price: "400000",
      note: "Khám lần đầu",
      createdAt: "2024-03-18",
    },
  ];

  const filterOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đã xác nhận", value: "confirmed" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  const filteredBookings =
    activeStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === activeStatus);

  const statusConfig = {
    pending: {
      color: "#faad14",
      text: "Chờ xác nhận",
      icon: <LoadingOutlined className="text-[#faad14]" />,
      bgColor: "#fff7e6",
      borderColor: "#ffd591",
    },
    confirmed: {
      color: "#1890ff",
      text: "Đã xác nhận",
      icon: <CheckCircleFilled className="text-[#1890ff]" />,
      bgColor: "#e6f7ff",
      borderColor: "#91d5ff",
    },
    completed: {
      color: "#52c41a",
      text: "Hoàn thành",
      icon: <CheckCircleFilled className="text-[#52c41a]" />,
      bgColor: "#f6ffed",
      borderColor: "#b7eb8f",
    },
    cancelled: {
      color: "#ff4d4f",
      text: "Đã hủy",
      icon: <CloseCircleOutlined className="text-[#ff4d4f]" />,
      bgColor: "#fff1f0",
      borderColor: "#ffa39e",
    },
  };

  const renderBookingCard = (booking) => {
    const status = statusConfig[booking.status];

    return (
      <Card
        key={booking.id}
        className="mb-6 overflow-hidden"
        bordered={false}
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* Status Banner */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: status.color }}
        />

        <div className="p-1">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                style={{
                  backgroundColor: status.bgColor,
                  color: status.color,
                  border: `1px solid ${status.borderColor}`,
                }}
              >
                {status.icon}
                <span className="font-medium">{status.text}</span>
              </div>
              <Tag
                icon={<CalendarOutlined />}
                className="m-0 border-0 bg-gray-50 text-base py-2 rounded-full"
              >
                {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
              </Tag>
            </div>
            <div className="text-base">
              Giá khám:{" "}
              <span className="font-semibold">
                {parseInt(booking.price).toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MedicineBoxOutlined className="text-xl text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {booking.doctor.name}
                </h3>
                <p className="text-gray-600">
                  Chuyên khoa: {booking.doctor.specialty}
                </p>
                <div className="mt-2 flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <CalendarOutlined />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined />
                    <span>
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium">Thông tin người khám</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <UserOutlined className="text-blue-500" />
                  <span>{booking.customer.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <PhoneOutlined className="text-blue-500" />
                  <span>{booking.customer.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MailOutlined className="text-blue-500" />
                  <span>{booking.customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <EnvironmentOutlined className="text-blue-500" />
                  <span>{booking.customer.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {(booking.status === "completed" || booking.status === "pending") && (
            <>
              <Divider style={{ margin: "20px 0" }} />
              <div className="flex justify-end gap-2">
                {booking.status === "completed" && (
                  <CustumButton variant="primary" icon={<StarFilled />}>
                    Đánh giá bác sĩ
                  </CustumButton>
                )}
                {booking.status === "pending" && (
                  <>
                    <CustumButton
                      variant="dangerFilled"
                      icon={<CloseCircleOutlined />}
                    >
                      Hủy lịch
                    </CustumButton>
                    <CustumButton variant="primary" icon={<EditOutlined />}>
                      Cập nhật thông tin
                    </CustumButton>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="mx-auto lg:px-16 mt-24">
      <Card
        title={
          <div className="flex items-center gap-2 text-lg uppercase">
            <span>Lịch sử đặt khám</span>
          </div>
        }
        className="mb-6"
        bordered={false}
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
      >
        <Radio.Group
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value)}
          className="flex flex-wrap gap-2"
          buttonStyle="solid"
        >
          {filterOptions.map((option) => (
            <Radio.Button
              key={option.value}
              value={option.value}
              className="px-4"
            >
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Card>

      <div>
        {filteredBookings.length > 0 ? (
          filteredBookings.map(renderBookingCard)
        ) : (
          <Empty
            description="Không có lịch đặt khám nào"
            className="bg-white p-8 rounded-lg shadow-sm"
          />
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
