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
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

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
  return (
    <Spin spinning={isLoading}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <Card
              title={
                <Space className="flex items-center justify-between flex-wrap">
                  <Title level={5}>Đơn hàng: <span className="uppercase">OD{order._id}</span></Title>
                  <Button icon={<ShoppingCartOutlined />}>Mua lại</Button>
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
                      description={`${formatPrice(product.price)} đ x ${product.quantity
                        }`}
                    />
                    <div>{formatPrice(product.price * product.quantity)} đ</div>
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
