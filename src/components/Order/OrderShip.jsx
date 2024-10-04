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
  Timeline,
  Tooltip,
  message,
  Popconfirm,
} from "antd";
import {
  ShopOutlined,
  CarOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";
import ModalOrderDetail from "../Modal/ModalOrderDetail";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory, updateStatusOrderByUser } from "../../redux/order/order.thunk";

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
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});

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
        status: 'shipping'
      }))
    }
  }

  const renderShippingTimeline = (order) => {
    const items = [
      {
        dot: <ShopOutlined style={{ fontSize: "16px" }} />,
        color: "blue",
        children: (
          <>
            Đơn hàng đã được xử lý
            <p>{formatDateReview(order.updatedAt)}</p>
          </>
        ),
      },
      {
        dot: <CarOutlined style={{ fontSize: "16px" }} />,
        color: "green",
        children: (
          <>
            Đơn hàng đang được vận chuyển
            <p>{formatDateReview(new Date())}</p>
          </>
        ),
      },
      {
        dot: <CheckCircleOutlined style={{ fontSize: "16px" }} />,
        color: "gray",
        children: (
          <>
            Dự kiến giao hàng
            <p>
              {formatDateReview(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))}
            </p>
          </>
        ),
      },
    ];

    return <Timeline mode="left" items={items} />;
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
              className="mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              title={
                <Space className="flex items-center justify-between flex-wrap py-2">
                  <Title level={5}>Đơn hàng: <span className="uppercase">OD{order._id}</span></Title>
                  <div className="flex items-center gap-2">
                    <Popconfirm
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
                    </Popconfirm>
                    <Button onClick={() => {
                      setOrder(order)
                      setOpen(true)
                    }}><EyeOutlined /></Button>
                  </div>
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
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  {renderShippingTimeline(order)}
                </div>
              </div>
              <Space direction="vertical" className="w-full mt-4">
                <Text>
                  Địa chỉ: {order.address}, {order.ward.name},{" "}
                  {order.district.name}, {order.province.name}
                </Text>
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
