import React, { useState } from "react";
import {
  List,
  Card,
  Button,
  Spin,
  Pagination,
  Typography,
  Space,
  Tag,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { formatPrice } from "@helpers/formatPrice";
import { formatDateReview } from "@helpers/formatDate";
import ModalOrderDetail from "@components/Modal/ModalOrderDetail";
import isEmpty from "lodash/isEmpty";
import { useDispatch } from "react-redux";
import {
  getOrderHistory,
  updateStatusOrderByUser,
} from "@redux/order/order.thunk";

const { Title, Text } = Typography;

const OrderCancel = ({
  isLoading,
  orders,
  page,
  pageSize,
  totalPage,
  totalItems,
  setPaginate,
}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});

  const handleOrderAgain = async (orderId) => {
    const res = await dispatch(updateStatusOrderByUser({
      id: orderId,
      data: {
        status: 'pending'
      }
    })).unwrap()
    if (res.success) {
      message.success(res.message)
      dispatch(getOrderHistory({
        page,
        pageSize,
        status: 'cancelled'
      }))
    }
  }

  return (
    <Spin spinning={isLoading}>
      <ModalOrderDetail
        {...{
          open,
          setOpen,
          order,
        }}
      />
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <Card
              title={
                <Space className="flex items-center justify-between flex-wrap">
                  <Title level={5}>Đơn hàng: <span className="uppercase">OD{order._id}</span></Title>
                  <div className="flex items-center gap-2">
                    <Popconfirm
                      className="max-w-40"
                      placement="bottom"
                      title={"Xác nhận mua lại ngay"}
                      onConfirm={() => handleOrderAgain(order._id)}
                      okText="Xác nhận"
                      cancelText="Hủy"
                      okButtonProps={{
                        loading: isLoading,
                      }}
                      destroyTooltipOnHide={true}
                    >
                      <Button icon={<ShoppingCartOutlined />}>Mua lại</Button>
                    </Popconfirm>
                    <Button onClick={() => {
                      setOrder(order)
                      setOpen(true)
                    }}><EyeOutlined /></Button>
                  </div>
                </Space>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={order.products}
                renderItem={(product) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      }
                      title={product.name}
                      description={
                        <>
                          <Text>
                            {formatPrice(product.price)} đ x {product.quantity}
                          </Text>
                          {
                            !isEmpty(product.color) &&
                            <Tooltip title={product.color.name}>
                              <div
                                style={{ backgroundColor: product.color.code }}
                                className={`w-6 h-6 rounded-full border border-gray-300`}
                              />
                            </Tooltip>
                          }
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
              <Space direction="vertical" className="w-full mt-4">
                <Text>Ngày hủy: {formatDateReview(order.updatedAt)}</Text>
                <Text>Lý do hủy: {order.cancelReason || "Không có lý do"}</Text>
                <div className="flex items-center justify-between">
                  <Tag color="red">Đã hủy</Tag>
                  <Text strong>
                    Tổng tiền: {formatPrice(order.totalAmount)} đ
                  </Text>
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
      />
      {
        orders.length > 0 &&
        <div className="text-right mt-4">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalItems}
            onChange={(page) => setPaginate((prev) => ({ ...prev, page }))}
            onShowSizeChange={(_, pageSize) =>
              setPaginate((prev) => ({ ...prev, pageSize }))
            }
            showTotal={(total) => `Tổng ${total} đơn hàng đã hủy`}
          />
        </div>
      }

    </Spin>
  );
};

export default OrderCancel;
