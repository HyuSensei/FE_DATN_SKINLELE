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
import { EyeOutlined, StarOutlined } from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";
import ModalRate from "../Modal/ModalRate";
import ModalOrderDetail from "../Modal/ModalOrderDetail";
import isEmpty from "lodash/isEmpty";

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
  const [open, setOpen] = useState(false);
  const [hoverValue, setHoverValue] = useState(0);
  const [rate, setRate] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const [openOrder, setOpenOrder] = useState(false);
  const [order, setOrder] = useState({});

  const groupProductsByProductId = (products) => {
    const groupedProducts = {};
    products.forEach(product => {
      if (!groupedProducts[product.productId]) {
        groupedProducts[product.productId] = {
          ...product,
          variants: [{ color: product.color, quantity: product.quantity }],
          totalQuantity: product.quantity,
          isReviewed: product.isReviewed,
        };
      } else {
        groupedProducts[product.productId].variants.push({ color: product.color, quantity: product.quantity });
        groupedProducts[product.productId].totalQuantity += product.quantity;
        groupedProducts[product.productId].isReviewed = groupedProducts[product.productId].isReviewed || product.isReviewed;
      }
    });
    return Object.values(groupedProducts);
  };

  return (
    <Spin spinning={isLoading}>
      <ModalOrderDetail
        {...{
          open: openOrder,
          setOpen: setOpenOrder,
          order,
        }}
      />
      <ModalRate
        {...{
          status: "delivered",
          product: productDetail,
          open,
          setOpen,
          rate,
          setRate,
          hoverValue,
          setHoverValue,
          order: orderId,
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
                      setOrder(order)
                      setOpenOrder(true)
                    }}><EyeOutlined /></Button>
                  </div>
                </Space>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={groupProductsByProductId(order.products)}
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
                        <Space direction="vertical">
                          <Text>
                            {formatPrice(product.price)} đ x {product.totalQuantity}
                          </Text>
                          <div className="flex gap-2">
                            {product.variants.map((variant, index) => (
                              !isEmpty(variant.color) && (
                                <Tooltip key={index} title={`${variant.color.name} (x${variant.quantity})`}>
                                  <div
                                    style={{ backgroundColor: variant.color.code }}
                                    className={`w-6 h-6 rounded-full border border-gray-300`}
                                  />
                                </Tooltip>
                              )
                            ))}
                          </div>
                          <Button
                            disabled={product.isReviewed}
                            onClick={() => {
                              setOrderId(order._id);
                              setProductDetail({
                                _id: product.productId,
                                name: product.name,
                                image: product.image,
                              });
                              setOpen(true);
                            }}
                            icon={<StarOutlined />}
                          >
                            {product.isReviewed ? "Đã đánh giá" : "Đánh giá"}
                          </Button>
                        </Space>
                      }
                    />
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
      {orders.length > 0 && (
        <div className="text-right mt-4">
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
      )}
    </Spin>
  );
};

export default OrderComplete;