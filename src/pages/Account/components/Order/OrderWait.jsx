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
} from "antd";
import {
  EyeOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { formatPrice } from "@helpers/formatPrice";
import { formatDateReview } from "@helpers/formatDate";
import ModalEditShip from "@components/Modal/ModalEditShip";
import ModalOrderDetail from "@components/Modal/ModalOrderDetail";
import isEmpty from "lodash/isEmpty";
import ModalReansonCancel from "@components/Modal/ModalReasonCancel";

const { Title, Text } = Typography;

const OrderWait = ({
  isLoading,
  orders,
  page,
  pageSize,
  totalPage,
  totalItems,
  setPaginate,
}) => {
  const [open, setOpen] = useState(false)
  const [orderItem, setOrderItem] = useState({})
  const [openOrder, setOpenOrder] = useState(false);
  const [openCancel, setOpenCancel] = useState(false)
  const [orderId, setOrderId] = useState("")

  const renderPaymentMethod = (method) => {
    switch (method) {
      case "COD":
        return "Thanh toán khi nhận hàng";
      case "STRIPE":
        return "Thanh toán qua Stripe";
      case "VNPAY":
        return "Thanh toán qua VNPay";
      default:
        return method;
    }
  };

  return (
    <Spin spinning={isLoading}>
      <ModalReansonCancel {...{
        open: openCancel,
        setOpen: setOpenCancel,
        orderId,
        setOrderId,
        statusPage: 'pending'
      }} />
      <ModalOrderDetail
        {...{
          open: openOrder,
          setOpen: setOrderItem,
          order: orderItem,
        }}
      />
      <ModalEditShip
        {...{
          open,
          setOpen,
          order: orderItem
        }}
      />
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <Card
              className="mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              title={
                <Space className="flex items-center justify-between flex-wrap py-2">
                  <Title level={5}>Đơn hàng: <span className="uppercase">OD{order._id}</span></Title>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => {
                      setOrderId(order._id)
                      setOpenCancel(true)
                    }} danger>Hủy đơn hàng</Button>
                    <Button onClick={() => {
                      setOrderItem(order)
                      setOpen(false)
                      setOpenOrder(true)
                    }}><EyeOutlined /></Button>
                    <Button onClick={() => {
                      setOrderItem(order)
                      setOpen(true)
                      setOpenOrder(false)
                    }}><HighlightOutlined /></Button>
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
                <Text>Ngày đặt hàng: {formatDateReview(order.createdAt)}</Text>
                <Text>
                  Phương thức thanh toán:{" "}
                  {renderPaymentMethod(order.paymentMethod)}
                </Text>
                <Text>
                  Địa chỉ: {order.address}, {order.ward.name},{" "}
                  {order.district.name}, {order.province.name}
                </Text>
                <Text>Số điện thoại: {order.phone}</Text>
                {order.note && <Text>Ghi chú: {order.note}</Text>}
                <div className="flex items-center justify-between">
                  <Tag color="orange">Chờ xác nhận</Tag>
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
            showTotal={(total) => `Tổng ${total} đơn hàng chờ xác nhận`}
          />
        </div>
      }
    </Spin>
  );
};

export default OrderWait;
