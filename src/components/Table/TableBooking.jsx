import React from "react";
import { Table, Tag, Pagination } from "antd";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const TableBooking = ({
  bookings = [],
  loading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <div>
          <div>{customer.name}</div>
          <div className="text-gray-500">{customer.email}</div>
          <div className="text-gray-500">{customer.phone}</div>
        </div>
      ),
    },
    {
      title: "Ngày khám",
      dataIndex: "date",
      key: "date",
      render: (date) => <div>{new Date(date).toLocaleDateString()}</div>,
    },
    {
      title: "Thời gian",
      dataIndex: "startTime",
      key: "time",
      render: (startTime, record) => (
        <div>
          {startTime} - {record.endTime}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "pending") {
          color = "orange";
        } else if (status === "cancelled") {
          color = "red";
        } else if (status === "completed") {
          color = "green";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <FaEye
            className="text-blue-500 cursor-pointer"
            onClick={() => handleViewBooking(record._id)}
          />
          <FaEdit
            className="text-green-500 cursor-pointer"
            onClick={() => handleEditBooking(record._id)}
          />
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteBooking(record._id)}
          />
        </div>
      ),
    },
  ];

  const handleViewBooking = (bookingId) => {
    // Xử lý xem chi tiết lịch khám
  };

  const handleEditBooking = (bookingId) => {
    // Xử lý chỉnh sửa lịch khám
  };

  const handleDeleteBooking = (bookingId) => {
    // Xử lý xóa lịch khám
  };

  const handlePaginationChange = (page, pageSize) => {
    setPaginate({ page, pageSize });
  };

  return (
    <div>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />
      {bookings.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePaginationChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
      )}
    </div>
  );
};

export default TableBooking;
