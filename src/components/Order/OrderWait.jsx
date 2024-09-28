import React from "react";
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
  ClockCircleOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

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
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <Card
              className="mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              title={
                <Space className="flex items-center justify-between flex-wrap py-2">
                  <Title level={5}>Đơn hàng: OD{order._id}</Title>
                  <Space>
                    <Button danger>Hủy đơn hàng</Button>
                  </Space>
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
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      }
                      title={product.name}
                      description={
                        <Space direction="vertical">
                          <Text>{`${formatPrice(product.price)} đ x ${
                            product.quantity
                          }`}</Text>
                        </Space>
                      }
                    />
                    <div>{formatPrice(product.price * product.quantity)} đ</div>
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
    </Spin>
  );
};

export default OrderWait;
