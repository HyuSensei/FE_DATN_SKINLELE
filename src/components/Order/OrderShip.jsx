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
  Timeline,
} from "antd";
import {
  ShopOutlined,
  CarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

const { Title, Text } = Typography;

const OrderShip = ({
  isLoading,
  orders,
  page,
  pageSize,
  totalPage,
  totalItems,
  setPaginate,
}) => {
  const renderShippingTimeline = (order) => (
    <Timeline mode="left">
      <Timeline.Item
        dot={<ShopOutlined style={{ fontSize: "16px" }} />}
        color="blue"
      >
        Đơn hàng đã được xử lý
        <p>{formatDateReview(order.updatedAt)}</p>
      </Timeline.Item>
      <Timeline.Item
        dot={<CarOutlined style={{ fontSize: "16px" }} />}
        color="green"
      >
        Đơn hàng đang được vận chuyển
        <p>{formatDateReview(new Date())}</p>
      </Timeline.Item>
      <Timeline.Item
        dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />}
        color="gray"
      >
        Dự kiến giao hàng
        <p>
          {formatDateReview(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))}
        </p>
      </Timeline.Item>
    </Timeline>
  );

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
                  <Title level={5}>Đơn hàng: <span className="uppercase">OD{order._id}</span></Title>
                  <Button type="primary">Đã nhận hàng</Button>
                </Space>
              }
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 pr-0 md:pr-4">
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
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                              }}
                            />
                          }
                          title={product.name}
                          description={`${formatPrice(product.price)} đ x ${product.quantity
                            }`}
                        />
                      </List.Item>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  {renderShippingTimeline(order)}
                </div>
              </div>
              <Space direction="vertical" className="w-full mt-4">
                <Text>Địa chỉ giao hàng: {order.address}</Text>
                <Text>Số điện thoại: {order.phone}</Text>
                <div className="flex items-center justify-between">
                  <Tag color="cyan">Đang giao hàng</Tag>
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
            showTotal={(total) => `Tổng ${total} đơn hàng đang giao`}
          />
        </div>
      }
    </Spin>
  );
};

export default OrderShip;
