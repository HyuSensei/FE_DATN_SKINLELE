import React, { useState } from "react";
import { Button, Card, Empty, Radio, Spin, Tooltip } from "antd";
import {
  CheckCircleFilled,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import moment from "moment/moment";
import "moment/locale/vi";
import BookingCard from "./BookingCard";
import { useSelector } from "react-redux";
import { useGetBookingsByCustomerQuery } from "@/redux/booking/booking.query";
import EmptyData from "@/components/Error/EmptyData";

moment.locale("vi");

const BookingHistory = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    status: "",
  });
  const { isAuthenticated } = useSelector((state) => state.auth);

  const filterOptions = [
    { label: "Tất cả", value: "" },
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đã xác nhận", value: "confirmed" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  const { data, isLoading, error } = useGetBookingsByCustomerQuery(
    {
      ...params,
    },
    { skip: !isAuthenticated }
  );

  if (error) return <EmptyData description="Không tìm thấy lich sử đặt khám" />;

  const bookings = data?.bookings || [];
  const { hasMore = false, statistics = {} } = data || {};

  const handleChangeParams = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="mx-auto lg:px-16 mt-28 mb-10">
      <Card
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Lịch sử đặt khám</span>
          </div>
        }
        className="mb-6 shadow-sm"
      >
        <Radio.Group
          value={activeStatus}
          onChange={(e) => {
            setActiveStatus(e.target.value);
            handleChangeParams("status", e.target.value);
          }}
          className="flex flex-wrap gap-2 mb-4"
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

        <div className="text-sm text-gray-500 space-x-4">
          <Tooltip title="Tổng số lịch khám">
            <span>
              <CalendarOutlined className="mr-1 text-blue-500" />
              Tổng số: {statistics?.total || 0}
            </span>
          </Tooltip>
          <Tooltip title="Đã hoàn thành">
            <span>
              <CheckCircleFilled className="mr-1 text-green-500" />
              Hoàn thành: {statistics?.completed || 0}
            </span>
          </Tooltip>
          <Tooltip title="Đang chờ">
            <span>
              <ClockCircleOutlined className="mr-1 text-orange-500" />
              Đang chờ: {statistics?.pending || 0}
            </span>
          </Tooltip>
          <Tooltip title="Đã xác nhận">
            <span>
              <CheckOutlined className="mr-1 text-blue-500" />
              Đã xác nhận: {statistics?.confirmed || 0}
            </span>
          </Tooltip>
          <Tooltip title="Đã hủy">
            <span>
              <CloseCircleFilled className="mr-1 text-red-500" />
              Đã hủy: {statistics?.cancelled || 0}
            </span>
          </Tooltip>
        </div>
      </Card>

      <Spin spinning={isLoading} tip="Đang tải...">
        {bookings.length > 0 ? (
          bookings.map((item) => <BookingCard key={item._id} booking={item} />)
        ) : (
          <Empty description="Không có lịch đặt khám nào !" />
        )}
      </Spin>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button
            type="link"
            onClick={() =>
              setParams((prev) => ({ ...prev, page: prev.page + 1 }))
            }
          >
            Tải thêm lịch khám
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
