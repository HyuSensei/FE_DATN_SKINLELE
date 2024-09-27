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
  Rate,
} from "antd";
import { StarOutlined } from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

const { Title, Text } = Typography;

const OrderComplete = ({
  isLoading,
  orders,
  page,
  pageSize,
  totalPage,
  totalItems,
  setPaginate,
}) => {
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
                  <Button icon={<StarOutlined />}>Đánh giá</Button>
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
                          {product.isReviewed && (
                            <Rate disabled defaultValue={product.rating} />
                          )}
                        </Space>
                      }
                    />
                    <div>{formatPrice(product.price * product.quantity)} đ</div>
                  </List.Item>
                )}
              />
              <Space direction="vertical" className="w-full mt-4">
                <Text>
                  Ngày hoàn thành: {formatDateReview(order.updatedAt)}
                </Text>
                <div className="flex items-center justify-between">
                  <Tag color="green">Đã giao</Tag>
                  <Text strong>
                    Tổng tiền: {formatPrice(order.totalAmount)} đ
                  </Text>
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
      />
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalItems}
          onChange={(page) => setPaginate((prev) => ({ ...prev, page }))}
          onShowSizeChange={(_, pageSize) =>
            setPaginate((prev) => ({ ...prev, pageSize }))
          }
          showTotal={(total) => `Tổng ${total} đơn hàng đã hoàn thành`}
        />
      </div>
    </Spin>
  );
};

export default OrderComplete;
