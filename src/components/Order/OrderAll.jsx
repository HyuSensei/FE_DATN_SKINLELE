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
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { EyeOutlined, ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { formatPrice } from "@helpers/formatPrice";
import ModalOrderDetail from "@components/Modal/ModalOrderDetail";
import isEmpty from "lodash/isEmpty";
import ModalRate from "@components/Modal/ModalRate";
import ModalReansonCancel from "@components/Modal/ModalReasonCancel";
import {
  getOrderHistory,
  updateStatusOrderByUser,
} from "@redux/order/order.thunk";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [hoverValue, setHoverValue] = useState(0);
  const [rate, setRate] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const [openRate, setOpenRate] = useState(false);
  const [openCancel, setOpenCancel] = useState(false)

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
        return <Button onClick={() => {
          setOrderId(order._id)
          setOpenCancel(true)
        }} danger>Hủy đơn hàng</Button>;
      case "shipping":
        return <Popconfirm
          className="max-w-40"
          placement="bottom"
          title={"Xác nhận giao hàng thành công"}
          onConfirm={() => handleCompleteOrder(order._id)}
          okText="Xác nhận"
          cancelText="Hủy"
          okButtonProps={{
            loading: isLoading,
          }}
          destroyTooltipOnHide={true}
        >
          <Button type="primary">Đã nhận hàng</Button>
        </Popconfirm>;
      case "cancelled":
        return <Button icon={<ShoppingCartOutlined />}>Mua lại</Button>;
      default:
        return <></>;
    }
  };

  const groupProductsByProductId = (products) => {
    const groupedProducts = {};
    products.forEach(product => {
      if (!groupedProducts[product.productId]) {
        groupedProducts[product.productId] = {
          ...product,
          variants: [{ color: product.color, quantity: product.quantity }]
        };
      } else {
        groupedProducts[product.productId].variants.push({ color: product.color, quantity: product.quantity });
        groupedProducts[product.productId].quantity += product.quantity;
      }
    });
    return Object.values(groupedProducts);
  };

  const handleCompleteOrder = async (orderId) => {
    const res = await dispatch(updateStatusOrderByUser({
      id: orderId,
      data: {
        status: 'delivered'
      }
    })).unwrap()
    if (res.success) {
      message.success(res.message)
      dispatch(getOrderHistory({
        page,
        pageSize,
        status: 'all'
      }))
    }
  }

  return (
    <Spin spinning={isLoading}>
      <ModalReansonCancel {...{
        open: openCancel,
        setOpen: setOpenCancel,
        orderId,
        setOrderId,
      }} />
      <ModalRate
        {...{
          product: productDetail,
          open: openRate,
          setOpen: setOpenRate,
          rate,
          setRate,
          hoverValue,
          setHoverValue,
          order: orderId,
        }}
      />
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
              className="mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              title={
                <Space className="flex items-center justify-between flex-wrap py-2">
                  <Title level={5}>Đơn hàng: <span className="uppercase">OD{order._id}</span></Title>
                  <div className="flex items-center gap-2">
                    {renderOrderActions(order)}
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
                        <>
                          <Text>
                            {formatPrice(product.price)} đ x {product.quantity}
                          </Text>
                          <div className="flex gap-2 mt-2">
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
                        </>
                      }
                    />
                    <div className="flex flex-col items-center justify-end gap-1 flex-wrap">
                      {order.status === "delivered" && (
                        <Button
                          onClick={() => {
                            setOrderId(order._id);
                            setProductDetail({
                              _id: product.productId,
                              name: product.name,
                              image: product.image,
                            });
                            setOpenRate(true);
                          }}
                          disabled={product.isReviewed}
                          icon={<StarOutlined />}
                        >
                          {product.isReviewed ? "Đã đánh giá" : "Đánh giá"}
                        </Button>
                      )}
                    </div>
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
      {orders.length > 0 && (
        <div className="text-right mt-4">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalItems}
            onChange={(page) => {
              setPaginate((prev) => ({ ...prev, page }));
            }}
            onShowSizeChange={(_, pageSize) => {
              setPaginate((prev) => ({ ...prev, pageSize }));
            }}
            showTotal={(total) => `Tổng ${total} đơn hàng`}
          />
        </div>
      )}
    </Spin>
  );
};

export default OrderAll;
