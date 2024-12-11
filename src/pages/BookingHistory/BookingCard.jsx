import { Avatar, Badge, Card, Divider, Tag, Tooltip } from "antd";
import React from "react";
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
  InfoCircleOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import CustomButton from "@/components/CustomButton";
import moment from "moment/moment";
import "moment/locale/vi";
import { formatPrice } from "@/helpers/formatPrice";

moment.locale("vi");

const BookingCard = ({ booking }) => {
  const statusConfig = {
    pending: {
      color: "#faad14",
      text: "Chờ xác nhận",
      icon: <LoadingOutlined />,
      bgColor: "#fff7e6",
      borderColor: "#ffd591",
      description: "Đang chờ xác nhận từ phòng khám",
    },
    confirmed: {
      color: "#1890ff",
      text: "Đã xác nhận",
      icon: <CheckCircleFilled />,
      bgColor: "#e6f7ff",
      borderColor: "#91d5ff",
      description: "Lịch khám đã được xác nhận",
    },
    completed: {
      color: "#52c41a",
      text: "Hoàn thành",
      icon: <CheckCircleFilled />,
      bgColor: "#f6ffed",
      borderColor: "#b7eb8f",
      description: "Đã hoàn thành khám",
    },
    cancelled: {
      color: "#ff4d4f",
      text: "Đã hủy",
      icon: <CloseCircleOutlined />,
      bgColor: "#fff1f0",
      borderColor: "#ffa39e",
      description: "Lịch khám đã bị hủy",
    },
  };
  const status = statusConfig[booking.status];

  return (
    <Card
      className="mb-6 overflow-hidden transition-all hover:shadow-lg"
      bordered={false}
    >
      {/* Status Banner */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: status.color }}
      />

      <div className="p-6">
        {/* Header with Status */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip title={status.description}>
              <div
                className="px-4 py-2 rounded-full text-sm flex items-center gap-2"
                style={{
                  backgroundColor: status.bgColor,
                  color: status.color,
                  border: `1px solid ${status.borderColor}`,
                }}
              >
                {status.icon}
                <span className="font-medium">{status.text}</span>
              </div>
            </Tooltip>
            <Tag
              icon={<CalendarOutlined />}
              className="m-0 py-1.5 px-3 text-base bg-gray-50 border-0 rounded-full"
            >
              {moment(booking.date).format("DD MMMM, YYYY")}
            </Tag>
          </div>
          <Tag
            icon={<MoneyCollectOutlined />}
            color="orange"
            className="m-0 py-1.5 px-3 text-base"
          >
            Giá khám: {formatPrice(booking.price)} VND
          </Tag>
        </div>

        {/* Doctor & Appointment Info */}
        <div className="bg-blue-50/50 p-6 rounded-xl mb-6">
          <div className="flex gap-4">
            <Avatar
              src={booking.doctor.avatar?.url}
              icon={<UserOutlined />}
              size={64}
              className="flex-shrink-0 border-2 border-sky-400"
            />
            <div className="flex-grow">
              <div className="flex flex-wrap justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {booking.doctor.name}
                  </h3>
                  <p className="text-gray-600">
                    <MedicineBoxOutlined className="mr-2" />
                    Chuyên khoa: {booking.doctor.specialty}
                  </p>
                </div>
                <Badge.Ribbon
                  text={
                    <div className="py-1">
                      <ClockCircleOutlined className="mr-2" />
                      {moment(booking.startTime, "HH:mm").format(
                        "HH:mm"
                      )} - {moment(booking.endTime, "HH:mm").format("HH:mm")}
                    </div>
                  }
                  color="blue"
                />
              </div>
              <div className="text-gray-600">
                <p className="flex items-center">
                  <EnvironmentOutlined className="mr-2" />
                  {booking.clinic.name}
                </p>
                <p
                  className="ml-6 text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: booking.clinic.address,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="flex items-center gap-2 font-medium mb-4">
            <UserOutlined className="text-blue-500" />
            Thông tin người khám
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <UserOutlined className="text-gray-400" />
                <span>{booking.customer.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneOutlined className="text-gray-400" />
                <span>{booking.customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MailOutlined className="text-gray-400" />
                <span>{booking.customer.email}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CalendarOutlined className="text-gray-400" />
                <span>
                  Ngày sinh:{" "}
                  {moment(booking.customer.dateOfBirth).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <UserOutlined className="text-gray-400" />
                <span>
                  Giới tính: {booking.customer.gender === "male" ? "Nam" : "Nữ"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <EnvironmentOutlined className="text-gray-400" />
                <span>{booking.customer.address}</span>
              </div>
            </div>
          </div>

          {booking.note && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-2">
                <InfoCircleOutlined className="text-blue-500 mt-1" />
                <div>
                  <span className="font-medium">Ghi chú:</span> {booking.note}
                </div>
              </div>
            </div>
          )}

          {booking.statusHistory && booking.statusHistory.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h5 className="text-sm font-medium mb-2 text-gray-600">
                Lịch sử trạng thái
              </h5>
              <div className="space-y-2">
                {booking.statusHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-500"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: statusConfig[item.status]?.color,
                      }}
                    />
                    <span>
                      {moment(item.date).format("HH:mm, DD/MM/YYYY")} -{" "}
                      {statusConfig[item.status]?.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {(booking.status === "completed" || booking.status === "pending") && (
          <>
            <Divider />
            <div className="flex flex-wrap justify-end gap-3">
              {booking.status === "completed" && (
                <CustomButton
                  variant="primary"
                  icon={<StarFilled />}
                  className="shadow-sm"
                >
                  Đánh giá bác sĩ
                </CustomButton>
              )}
              {booking.status === "pending" && (
                <>
                  <CustomButton
                    variant="dangerFilled"
                    icon={<CloseCircleOutlined />}
                    className="shadow-sm"
                  >
                    Hủy lịch
                  </CustomButton>
                  <CustomButton
                    variant="primary"
                    icon={<EditOutlined />}
                    className="shadow-sm"
                  >
                    Cập nhật thông tin
                  </CustomButton>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default BookingCard;
