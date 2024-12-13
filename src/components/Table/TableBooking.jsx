import React from "react";
import { Table, Tag, Pagination } from "antd";
import moment from "@utils/monentTz";
import { getStatusBooking } from "@/helpers/getStatus";

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
          <div className="font-medium">{customer.name}</div>
          <div className="text-gray-500">{customer.email}</div>
          <div className="text-gray-500">{customer.phone}</div>
        </div>
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
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <></>
      ),
    },
  ];

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
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page, pageSize) =>
            setPaginate((prev) => ({
              ...prev,
              page,
              pageSize,
            })),
        }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default TableBooking;
