import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Card,
  Select,
  Input,
  DatePicker,
  Empty,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { bookingStatus } from "@const/status";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useGetBookingsByDoctorQuery } from "@/redux/booking/booking.query";
const { RangePicker } = DatePicker;

const ManageBooking = ({ activeMenu }) => {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const { data, isLoading, error } = useGetBookingsByDoctorQuery({
    page: paginate.page,
    pageSize: paginate.pageSize,
    ...filters,
  });

  useEffect(() => {
    if (data && data.pagination) {
      setPaginate((prev) => ({
        ...prev,
        ...data.pagination,
      }));
    }
  }, [data]);

  if (!data || error)
    return <Empty description="Không tìm thấy thông tin lịch khám" />;

  const { bookings } = data;

  const statusColors = {
    pending: "gold",
    confirmed: "green",
    cancelled: "red",
    completed: "blue",
  };

  const columns = [
    {
      title: "Thông tin khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <div>
          <div className="font-medium">{customer.name}</div>
          <div className="text-gray-500">{customer.phone}</div>
          <div className="text-gray-500 text-sm">{customer.email}</div>
        </div>
      ),
    },
    {
      title: "Thời gian hẹn",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div>
          <div>{record.date}</div>
          <div className="text-gray-500">
            {record.startTime} - {record.endTime}
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Giá khám",
      dataIndex: "price",
      key: "price",
      render: (price) => `${parseInt(price).toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Select defaultValue={"pending"} className="w-full">
          {bookingStatus.map((item, index) => (
            <Select.Option key={index} value={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <Card className="my-4 bg-white rounded-md shadow-lg">
        <div className="flex items-center gap-4 flex-wrap">
          <Input
            className="w-full lg:flex-1"
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
          />
          <Select
            placeholder="Trạng thái"
            allowClear
            className="w-full lg:w-56"
          >
            {bookingStatus.length > 0 &&
              bookingStatus.map((item, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
          <RangePicker className="w-full lg:flex-1" locale={locale} />
        </div>
      </Card>
      <Card className="mt-6 shadow-lg" title="Danh sách lịch khám">
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={bookings}
          rowKey={(record) => record._id}
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
          loading={isLoading}
        />
      </Card>
    </>
  );
};

export default ManageBooking;
