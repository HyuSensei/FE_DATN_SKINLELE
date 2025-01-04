import React, { useMemo } from "react";
import {
  Pagination,
  Table,
  Tooltip,
  Tag,
  Select,
  Popconfirm,
  message,
} from "antd";
import { FaEye } from "react-icons/fa";
import { formatDateOrder } from "@helpers/formatDate";
import { formatPrice } from "@helpers/formatPrice";
import { orderStatus } from "@const/status";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteOrder,
  getOrderListAdmin,
  updateOrder,
} from "@redux/order/order.thunk";
import { useNavigate } from "react-router-dom";

const TableOrder = ({
  orders = [],
  isLoading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        title: "STT",
        key: "stt",
        width: 60,
        render: (_, __, index) => (page - 1) * pageSize + index + 1,
      },
      {
        title: "Mã đơn hàng",
        dataIndex: "_id",
        key: "_id",
        width: 100,
        render: (text) => (
          <Tooltip title={text}>
            <div className="uppercase max-w-64 break-words font-medium truncate-2-lines text-sm">
              OD{text}
            </div>
          </Tooltip>
        ),
      },
      {
        title: "Khách hàng",
        dataIndex: "name",
        key: "name",
        width: 150,
        render: (text) => (
          <Tooltip title={text}>
            <div className="max-w-64 break-words font-medium truncate-2-lines text-sm">
              {text}
            </div>
          </Tooltip>
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
                ? "#ad53ef"
                : "#87d068"
            }
          >
            {paymentMethod}
          </Tag>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 150,
        render: (status, record) => (
          <Select
            className="w-full"
            disabled={
              status === "cancelled" || status === "delivered" ? true : false
            }
            value={status}
            onChange={(value) => handleUpdateStatus(record._id, value)}
          >
            {orderStatus.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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
        title: "Ngày đặt",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        render: (createdAt) => (
          <span className="text-sm">{formatDateOrder(createdAt)}</span>
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
                onClick={() => navigate(`/admin/orders/${record._id}`)}
                className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors"
              >
                <FaEye />
              </button>
            </Tooltip>
            <Popconfirm
              className="max-w-40"
              placement="topLeft"
              title={"Xác nhận xóa thông tin đơn hàng"}
              description={
                <div className="font-medium uppercase">OD{record._id}</div>
              }
              onConfirm={() => removeOrder(record._id)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{
                loading: isLoading,
              }}
              destroyTooltipOnHide={true}
            >
              <Tooltip title="Xóa">
                <button className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
                  <MdOutlineDeleteOutline />
                </button>
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [page, pageSize]
  );

  const handleUpdateStatus = async (id, status) => {
    const res = await dispatch(updateOrder({ id, data: { status } })).unwrap();
    if (res.success) {
      message.success(res.message);
      dispatch(
        getOrderListAdmin({
          page,
          pageSize,
        })
      );
      return;
    }
  };

  const removeOrder = async (id) => {
    const res = await dispatch(deleteOrder(id)).unwrap();
    if (res.success) {
      message.success(res.message);
      dispatch(
        getOrderListAdmin({
          page,
          pageSize,
        })
      );
      return;
    }
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
