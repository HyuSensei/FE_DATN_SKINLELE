import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, DatePicker, Empty, Input, Select, Table, Tag } from "antd";
import { bookingStatus } from "@const/status";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useGetBookingByClinicQuery } from "@/redux/booking/booking.query";
import { getStatusBooking } from "@/helpers/getStatus";
import moment from "@utils/monentTz";
import { formatPrice } from "@/helpers/formatPrice";
import locale from "antd/es/date-picker/locale/vi_VN";
const { RangePicker } = DatePicker;

const ManageBooking = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const [filters, setFilters] = useState({
    status: "",
    fromDate: "",
    toDate: "",
    search: "",
  });

  const { data, isLoading, error } = useGetBookingByClinicQuery({
    ...paginate,
    ...filters,
  });

  if (error) return <Empty description="Không tìm thay dữ liệu" />;

  useEffect(() => {
    if (data) {
      setBookings(data.bookings);
      setPaginate((prev) => ({
        ...prev,
        page: data.pagination.page,
        pageSize: data.pagination.pageSize,
        totalPage: data.pagination.totalPage,
        totalItems: data.pagination.totalItems,
      }));
    }
  }, [data]);

  const debouncedFilter = useCallback(
    debounce((key, value) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 1000),
    []
  );

  const handleFilterChange = (key, value) => {
    debouncedFilter(key, value);
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <div>
          <div className="font-medium">{customer.name}</div>
          <div className="text-gray-500">{customer.email}</div>
          <div className="text-gray-500">{customer.phone}</div>
        </div>
      ),
    },
    {
      title: "Thông tin bác sĩ",
      dataIndex: "doctor",
      key: "doctor",
      render: (doctor) => (
        <div className="flex gap-2 items-center">
          <Avatar
            className="border-2 border-sky-400"
            size={60}
            src={doctor.avatar.url}
            alt="Avatar-doctor"
          />
          <div>
            <div className="font-medium">{doctor.name}</div>
            <div className="text-gray-500">{doctor.email}</div>
            <div className="text-gray-500">{doctor.phone}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Phí khám",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <div className="font-medium">{formatPrice(price)} VND</div>
      ),
    },
    {
      title: "Thời gian hẹn",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <>
          <div>{moment(record.date).format("DD MMMM, YYYY")}</div>
          <div className="text-gray-500">
            {record.startTime} - {record.endTime}
          </div>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusBooking(status).color}>
          {getStatusBooking(status).label.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 bg-white p-4 rounded-md shadow-lg flex gap-4 items-center mt-2">
        <Input
          className="w-full lg:flex-1"
          size="middle"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          allowClear
        />
        <RangePicker
          className="w-full lg:flex-1"
          locale={locale}
          onChange={(_, dateStrings) => {
            setFilters((prev) => ({
              ...prev,
              fromDate: dateStrings[0],
              toDate: dateStrings[1],
            }));
            setPaginate((prev) => ({
              ...prev,
              page: 1,
              pageSize: 10,
            }));
          }}
        />
        <Select
          size="middle"
          placeholder="Chọn trạng thái"
          onChange={(value) => handleFilterChange("status", value)}
          allowClear
          className="w-full lg:w-56"
        >
          {bookingStatus.map((item) => (
            <Select.Option key={item.id} value={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey={(record) => record._id}
        loading={isLoading}
        pagination={{
          current: paginate.page,
          pageSize: paginate.pageSize,
          total: paginate.totalItems,
          onChange: (page, pageSize) =>
            setPaginate((prev) => ({
              ...prev,
              page,
              pageSize,
            })),
        }}
        scroll={{ x: true }}
      />
    </>
  );
};

export default ManageBooking;
