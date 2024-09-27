import React from "react";
import {
  Modal,
  Descriptions,
  List,
  Typography,
  Tag,
  Space,
  Button,
  Divider,
  Steps,
} from "antd";
import {
  ShoppingOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";
import { isEmpty } from "lodash";

const { Title, Text } = Typography;
const { Step } = Steps;

const ModalOrderDetail = ({ open, setOpen, order = {} }) => {
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

  const getCurrentStep = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "processing":
        return 1;
      case "shipping":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return 4;
      default:
        return 0;
    }
  };

  if (isEmpty(order)) return null;

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={800}
      title={<Title level={4}>Chi tiết đơn hàng: OD{order._id}</Title>}
    >
      {order.status !== "cancelled" && (
        <Steps
          current={getCurrentStep(order.status)}
          size="small"
          className="mb-4"
        >
          <Step title="Chờ xác nhận" icon={<ClockCircleOutlined />} />
          <Step title="Đang xử lý" icon={<SyncOutlined spin />} />
          <Step title="Đang giao" icon={<CarOutlined />} />
          <Step title="Đã giao" icon={<CheckCircleOutlined />} />
        </Steps>
      )}

      <Divider />
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Trạng thái">
          <Tag color={getStatusColor(order.status)}>
            {getStatusText(order.status)}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">
          {formatDateReview(order.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Khách hàng">{order.name}</Descriptions.Item>
        <Descriptions.Item
          label={
            <Space>
              <EnvironmentOutlined /> Địa chỉ giao hàng
            </Space>
          }
        >
          {`${order.address}, ${order.ward.name}, ${order.district.name}, ${order.province.name}`}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Space>
              <PhoneOutlined /> Số điện thoại
            </Space>
          }
        >
          {order.phone}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Space>
              <CreditCardOutlined /> Phương thức thanh toán
            </Space>
          }
        >
          {renderPaymentMethod(order.paymentMethod)}
        </Descriptions.Item>
        {order.note && (
          <Descriptions.Item
            label={
              <Space>
                <FileTextOutlined /> Ghi chú
              </Space>
            }
          >
            {order.note}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Divider orientation="left">
        <Space>
          <ShoppingOutlined />
          Sản phẩm đã đặt
        </Space>
      </Divider>

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
                  style={{ width: 80, height: 80, objectFit: "cover" }}
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

      <Divider />

      <div className="flex justify-between items-center">
        <Title level={4}>Tổng cộng:</Title>
        <Title level={4}>{formatPrice(order.totalAmount)} đ</Title>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={() => setOpen(false)} type="primary">
          Đóng
        </Button>
      </div>
    </Modal>
  );
};

export default ModalOrderDetail;
