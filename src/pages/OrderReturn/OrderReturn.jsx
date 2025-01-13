import React, { useEffect, useState } from "react";
import {
  Card,
  Steps,
  Typography,
  Tag,
  Divider,
  Button,
  List,
  Avatar,
} from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ShoppingOutlined,
  ClockCircleOutlined,
  CarOutlined,
  SmileOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderStripeReturn, orderVnpayReturn } from "@redux/order/order.thunk";
import { formatDateOrder } from "@helpers/formatDate";
import { formatPrice } from "@helpers/formatPrice";
import Loading from "@components/Loading/Loading";
import { removeProductAfterOrderSuccess } from "@redux/cart/cart.slice";
import isEmpty from "lodash/isEmpty";

const { Title, Text } = Typography;

const OrderReturn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const { orderReturn, isLoading, error } = useSelector((state) => state.order);
  const { socketCustomer: socket } = useSelector((state) => state.socket);
  const [payload, setPayload] = useState({});

  const orderId = queryParams.get("vnp_TxnRef");
  const code = queryParams.get("vnp_ResponseCode");
  const stripeSessionId = queryParams.get("session_id");
  const orderSessionId = queryParams.get("order_session") || "";

  const handleOrderVnpayReturn = async () => {
    const res = await dispatch(orderVnpayReturn({ orderId, code })).unwrap();
    if (res.success) {
      const { products, user } = res.data;
      products.forEach((item) => {
        dispatch(
          removeProductAfterOrderSuccess({
            productId: item.productId,
            color: item.color,
          })
        );
      });
      setIsSuccess(true);
      navigate("/order-return");
      setPayload(res.data);
    } else {
      setIsSuccess(false);
      navigate("/order-return");
    }
  };

  const handleOrderStripeReturn = async () => {
    const res = await dispatch({ stripeSessionId, orderSessionId }).unwrap();
    if (res.success) {
      const { products, user } = res.data;
      if (products.length > 0) {
        products.forEach((item) => {
          dispatch(
            removeProductAfterOrderSuccess({
              productId: item.productId,
              color: item.color,
            })
          );
        });
      }
      setIsSuccess(true);
      navigate("/order-return");
      setPayload(res.data);
    } else {
      setIsSuccess(false);
      navigate("/order-return");
    }
  };

  useEffect(() => {
    if (
      !orderId &&
      !code &&
      !orderReturn._id &&
      !error.message &&
      !stripeSessionId &&
      !orderSessionId
    ) {
      navigate("/");
    }
  }, [orderReturn._id, orderId, code, error, stripeSessionId, orderSessionId]);

  useEffect(() => {
    if (orderId && code) {
      handleOrderVnpayReturn();
    }
  }, [orderId, code]);

  useEffect(() => {
    if (stripeSessionId || orderSessionId) {
      handleOrderStripeReturn();
    }
  }, [stripeSessionId, orderSessionId]);

  useEffect(() => {
    if (!isEmpty(payload) && socket) {
      socket.emit(
        "createOrder",
        JSON.stringify({
          order: payload,
          model: "User",
          recipient: payload.user,
        })
      );
    }
  }, [payload, socket]);

  const OrderStatus = () => (
    <Steps
      direction="vertical"
      current={1}
      className="custom-steps"
      items={[
        {
          title: "Đơn hàng đã đặt",
          description: formatDateOrder(orderReturn?.createdAt),
          icon: <ShoppingOutlined />,
        },
        {
          title: "Đang xử lý",
          description: "Đơn hàng của bạn đang được xử lý",
          icon: <ClockCircleOutlined />,
        },
        {
          title: "Đang giao hàng",
          icon: <CarOutlined />,
        },
        {
          title: "Đã giao hàng",
          icon: <SmileOutlined />,
        },
      ]}
    />
  );

  const OrderSummary = () => (
    <List
      itemLayout="horizontal"
      dataSource={orderReturn?.products}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.image} shape="square" size={64} />}
            title={<span>{item.name}</span>}
            description={`${item.quantity} x ${formatPrice(item.price)} đ`}
          />
          <div className="font-semibold">
            {formatPrice(item.price * item.quantity)} đ
          </div>
        </List.Item>
      )}
    />
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
      <Card className="max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
        <div
          className={`text-center ${
            isSuccess ? "text-pink-600" : "text-red-600"
          }`}
        >
          {isSuccess ? (
            <CheckCircleFilled style={{ fontSize: 80 }} className="mb-4" />
          ) : (
            <CloseCircleFilled style={{ fontSize: 80 }} className="mb-4" />
          )}
          <div
            className={`text-xl lg:text-3xl ${
              isSuccess ? "text-pink-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "Đặt hàng thành công!" : "Đặt hàng thất bại"}
          </div>
          <div className="text-gray-600 text-base lg:text-lg">
            {isSuccess
              ? "Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý."
              : "Rất tiếc, đã xảy ra lỗi khi xử lý đơn hàng của bạn. Vui lòng thử lại."}
          </div>
        </div>

        {isSuccess && !isEmpty(orderReturn) && (
          <>
            <Divider className="my-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pink-50 p-6 rounded-lg shadow-md">
                <Title level={4} className="text-pink-700 mb-4">
                  Thông tin đơn hàng
                </Title>
                <p className="mb-2">
                  <strong>Mã đơn hàng:</strong>{" "}
                  <span className="uppercase">OD{orderReturn._id}</span>
                </p>
                <p className="mb-2">
                  <strong>Ngày đặt:</strong>{" "}
                  {formatDateOrder(orderReturn.createdAt)}
                </p>
                <p className="mb-2">
                  <strong>Tổng tiền:</strong>{" "}
                  <span className="font-semibold">
                    {formatPrice(orderReturn.totalAmount)} đ
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {orderReturn.paymentMethod}
                </p>
                <Tag color="pink" className="mt-2">
                  {orderReturn.status === "pending" ? "Đang chờ" : ""}
                </Tag>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                <Title level={4} className="text-purple-700 mb-4">
                  Trạng thái đơn hàng
                </Title>
                <OrderStatus />
              </div>
            </div>

            <Divider className="my-8" />
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg shadow-md">
              <Title level={4} className="text-pink-700 mb-4">
                Sản phẩm đã đặt
              </Title>
              <OrderSummary />
            </div>
          </>
        )}

        {!isSuccess && error && (
          <div className="text-center mt-8 bg-red-50 p-6 rounded-lg shadow-md">
            <Title level={4} className="text-red-600 mb-4">
              {error.message}
            </Title>
            <Text className="text-gray-600">
              Vui lòng kiểm tra lại thông tin và thử lại
            </Text>
          </div>
        )}

        <Divider className="my-8" />
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to={`/order-detail/${orderReturn._id}`}>
            <Button
              type="link"
              className="text-lg"
              icon={<ArrowRightOutlined />}
            >
              Chi tiết thông tin đơn hàng
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default OrderReturn;
