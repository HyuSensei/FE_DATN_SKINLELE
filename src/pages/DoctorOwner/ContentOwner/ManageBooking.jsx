import React, { useState } from "react";
import { Table, Tag, Card, Select, Row, Input, Col, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { bookingStatus } from "@const/status";
import locale from "antd/es/date-picker/locale/vi_VN";
const { RangePicker } = DatePicker;

const ManageBooking = () => {
  const [filter, setFilter] = useState({
    search: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const bookings = [
    {
      _id: "1",
      customer: {
        name: "John Doe",
        phone: "0123456789",
        email: "john@example.com",
        dateOfBirth: "1990-01-01",
        gender: "male",
        address: "123 Street",
      },
      date: "2024-03-20",
      startTime: "09:00",
      endTime: "09:30",
      status: "pending",
      price: "500000",
      note: "First visit",
      statusHistory: [
        {
          status: "pending",
          updatedBy: "user123",
          updatedByModel: "User",
        },
      ],
      createdAt: "2024-03-19T10:00:00Z",
    },
    {
      _id: "2",
      customer: {
        name: "Jane Smith",
        phone: "0987654321",
        email: "jane@example.com",
        dateOfBirth: "1992-05-15",
        gender: "female",
        address: "456 Avenue",
      },
      date: "2024-03-21",
      startTime: "10:00",
      endTime: "10:30",
      status: "confirmed",
      price: "500000",
      note: "Follow-up",
      statusHistory: [
        {
          status: "pending",
          updatedBy: "user124",
          updatedByModel: "User",
        },
        {
          status: "confirmed",
          updatedBy: "doctor123",
          updatedByModel: "Doctor",
        },
      ],
      createdAt: "2024-03-19T11:00:00Z",
    },
  ];

  const statusColors = {
    pending: "gold",
    confirmed: "green",
    cancelled: "red",
    completed: "blue",
  };

  const columns = [
    {
      title: "Customer Information",
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
      title: "Appointment Time",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${parseInt(price).toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Actions",
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
          rowKey="_id"
          pagination={{
            pageSize: 10,
            total: bookings.length,
            showSizeChanger: true,
          }}
        />
      </Card>
    </>
  );
};

export default ManageBooking;
