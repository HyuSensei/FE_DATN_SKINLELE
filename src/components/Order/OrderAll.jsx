import React, { useState } from "react";
import {
  List,
  Card,
  Button,
  Tag,
  Spin,
  Pagination,
  Typography,
  Space,
} from "antd";
import { ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import ModalOrderDetail from "../Modal/ModalOrderDetail";

const { Title, Text } = Typography;

const OrderAll = ({
  isLoading,
  orders,
  page,
  pageSize,
  totalPage,
  totalItems,
  setPaginate,
}) => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "shipping":
        return "cyan";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
        return "Đang xử lý";
      case "shipping":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const renderOrderActions = (order) => {
    switch (order.status) {
      case "pending":
      case "processing":
        return <Button danger>Hủy đơn hàng</Button>;
      case "shipping":
        return <Button type="primary">Đã nhận hàng</Button>;
      case "delivered":
        return <Button icon={<StarOutlined />}>Đánh giá</Button>;
      case "cancelled":
        return <Button icon={<ShoppingCartOutlined />}>Mua lại</Button>;
      default:
        return <></>;
    }
  };

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
              onClick={() => {
                setOpen(true);
                setOrder(order);
              }}
              className="mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              title={
                <Space className="flex items-center justify-between flex-wrap py-2">
                  <Title level={5}>Đơn hàng: OD{order._id}</Title>
                  {renderOrderActions(order)}
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
                      description={`${formatPrice(product.price)} đ x ${
                        product.quantity
                      }`}
                    />
                    <div>{formatPrice(product.price * product.quantity)} đ</div>
                  </List.Item>
                )}
              />
              <div className="flex items-center mt-4 justify-between">
                <Tag color={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Tag>
                <Text strong>
                  Tổng tiền: {formatPrice(order.totalAmount)} đ
                </Text>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <div className="mt-4 text-right">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalItems}
          onChange={(page) => setPaginate((prev) => ({ ...prev, page }))}
          onShowSizeChange={(_, pageSize) =>
            setPaginate((prev) => ({ ...prev, pageSize }))
          }
          showTotal={(total) => `Tổng ${total} đơn hàng`}
        />
      </div>
    </Spin>
  );
};

export default OrderAll;
