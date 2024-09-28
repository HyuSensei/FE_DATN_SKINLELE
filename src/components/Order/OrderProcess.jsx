import React from "react";
import {
  List,
  Card,
  Spin,
  Pagination,
  Typography,
  Space,
  Tag,
  Steps,
} from "antd";
import {
  ClockCircleOutlined,
  SyncOutlined,
  CarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

const { Title, Text } = Typography;
const { Step } = Steps;

const OrderProcess = ({
  isLoading,
  orders,
  page,
  pageSize,
  totalPage,
  totalItems,
  setPaginate,
}) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return { color: "orange", text: "Chờ xác nhận", step: 0 };
      case "processing":
        return { color: "blue", text: "Đang xử lý", step: 1 };
      case "shipping":
        return { color: "cyan", text: "Đang giao", step: 2 };
      default:
        return { color: "default", text: status, step: 0 };
    }
  };

  return (
    <Spin spinning={isLoading}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={orders}
        renderItem={(order) => {
          const { color, text, step } = getStatusInfo(order.status);
          return (
            <List.Item>
              <Card
                className="mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                title={
                  <Space className="flex items-center justify-between flex-wrap py-2">
                    <Title level={5}>Đơn hàng: OD{order._id}</Title>
                  </Space>
                }
              >
                <Steps current={step} size="small" className="mb-4">
                  <Step title="Chờ xác nhận" icon={<ClockCircleOutlined />} />
                  <Step title="Đang xử lý" icon={<SyncOutlined spin />} />
                  <Step title="Đang giao" icon={<CarOutlined />} />
                  <Step title="Đã giao" icon={<CheckCircleOutlined />} />
                </Steps>
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
                        description={`${formatPrice(product.price)} đ x ${
                          product.quantity
                        }`}
                      />
                      <div>
                        {formatPrice(product.price * product.quantity)} đ
                      </div>
                    </List.Item>
                  )}
                />
                <Space direction="vertical" className="w-full mt-4">
                  <Text>
                    Ngày đặt hàng: {formatDateReview(order.createdAt)}
                  </Text>
                  <div className="flex items-center justify-between">
                    <Tag color={color}>{text}</Tag>
                    <Text strong>
                      Tổng tiền: {formatPrice(order.totalAmount)} đ
                    </Text>
                  </div>
                </Space>
              </Card>
            </List.Item>
          );
        }}
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
          showTotal={(total) => `Tổng ${total} đơn hàng đang xử lý`}
        />
      </div>
    </Spin>
  );
};

export default OrderProcess;
