import React, { useMemo } from "react";
import { Pagination, Table, Tooltip, Tag, Select } from "antd";
import { FaEye } from "react-icons/fa";
import { formatDateOrder } from "../../helpers/formatDate";
import { formatPrice } from "../../helpers/formatPrice";

const { Option } = Select;

const TableOrder = ({
  orders = [],
  isLoading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
  setFilter,
}) => {
  const getColorStatus = (status) => {
    switch (status) {
      case "pending":
        return "#ff9800";
      case "processing":
        return "#2196f3";
      case "shipping":
        return "#4caf50";
      case "delivered":
        return "#8bc34a";
      case "cancelled":
        return "#f44336";
      default:
        return "#2196f3";
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "STT",
        key: "stt",
        width: 60,
        render: (_, __, index) => (page - 1) * pageSize + index + 1,
      },
      {
        title: "Khách hàng",
        dataIndex: "name",
        key: "name",
        width: 100,
        render: (text) => (
          <Tooltip title={text}>
            <div className="max-w-64 break-words font-medium truncate-2-lines text-sm">
              {text}
            </div>
          </Tooltip>
        ),
      },
      {
        title: "Sản phẩm",
        dataIndex: "products",
        key: "products",
        width: 250,
        render: (products) => (
          <div className="flex flex-col gap-2">
            {products.map((product, index) => (
              <div key={index} className="flex gap-2 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{product.name}</span>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Tổng tiền",
        dataIndex: "totalAmount",
        key: "totalAmount",
        width: 120,
        render: (totalAmount) => (
          <p className="font-medium text-[#820813]">
            {formatPrice(totalAmount)} đ
          </p>
        ),
      },
      {
        title: "Thanh toán",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
        width: 100,
        render: (paymentMethod) => (
          <Tag
            color={
              paymentMethod === "COD"
                ? "#f50"
                : paymentMethod === "STRIPE"
                ? "#2db7f5"
                : "#87d068"
            }
          >
            {paymentMethod}
          </Tag>
        ),
      },
      {
        title: "Ngày đặt",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        render: (createdAt) => (
          <span className="text-sm">{formatDateOrder(createdAt)}</span>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 150,
        render: (status, record) => (
          <Select
            value={status}
            style={{
              backgroundColor: getColorStatus(status),
              color: "white",
            }}
            onChange={(value) =>
              handleUpdateStatus(record._id, value, record.products)
            }
          >
            <Option value="pending">Đang chờ xử lý</Option>
            <Option value="processing">Đang xử lý</Option>
            <Option value="shipping">Đang giao hàng</Option>
            <Option value="delivered">Đã giao hàng</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        ),
      },
      {
        title: "Thao Tác",
        key: "action",
        width: 100,
        fixed: "right",
        render: (_, record) => (
          <div className="flex gap-2 items-center text-[#00246a]">
            <Tooltip title="Xem">
              <button
                onClick={() => handleOpenDetailOrder(record)}
                className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors"
              >
                <FaEye />
              </button>
            </Tooltip>
          </div>
        ),
      },
    ],
    [page, pageSize]
  );

  const handleUpdateStatus = (orderId, status, products) => {
    //implement api update status order
  };

  const handleOpenDetailOrder = (order) => {
    //open modal detail order
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey={(record) => record._id}
        pagination={false}
        loading={isLoading}
      />
      {orders?.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalItems}
            onChange={(newPage) =>
              setPaginate((prev) => ({ ...prev, page: newPage }))
            }
            onShowSizeChange={(_, size) =>
              setPaginate((prev) => ({ ...prev, pageSize: size }))
            }
            showSizeChanger
            showQuickJumper
          />
        </div>
      )}
    </>
  );
};

export default React.memo(TableOrder);
