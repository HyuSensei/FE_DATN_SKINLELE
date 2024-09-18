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
  HomeOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  orderStripeReturn,
  orderVnpayReturn,
} from "../../redux/order/order.thunk";
import { formatDateOrder } from "../../helpers/formatDate";
import { formatPrice } from "../../helpers/formatPrice";
import Loading from "../../components/Loading";
import { clearCart } from "../../redux/cart/cart.slice";

const { Title, Text } = Typography;
const { Step } = Steps;

const OrderReturn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const { orderReturn, isLoading, error } = useSelector((state) => state.order);

  const orderId = queryParams.get("vnp_TxnRef");
  const code = queryParams.get("vnp_ResponseCode");
  const stripeSessionId = queryParams.get("session_id");
  const orderSessionId = queryParams.get("order_session") || "";

  useEffect(() => {
    if (orderId && code) {
      dispatch(orderVnpayReturn({ orderId, code })).then((res) => {
        if (res.payload.success) {
          dispatch(clearCart());
          setIsSuccess(true);
          navigate("/order-return");
        } else {
          setIsSuccess(false);
          navigate("/order-return");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (stripeSessionId || orderSessionId) {
      dispatch(orderStripeReturn({ stripeSessionId, orderSessionId })).then(
        (res) => {
          if (res.payload.success) {
            dispatch(clearCart());
            setIsSuccess(true);
            navigate("/order-return");
          } else {
            setIsSuccess(false);
            navigate("/order-return");
          }
        }
      );
    }
  }, []);

  const handleHomePage = () => {
    navigate("/");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

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
            title={<span className="text-pink-700">{item.name}</span>}
            description={`${item.quantity} x ${formatPrice(item.price)} đ`}
          />
          <div className="text-pink-600 font-semibold">
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
          <Title
            level={2}
            className={isSuccess ? "text-pink-600" : "text-red-600"}
          >
            {isSuccess ? "Đặt hàng thành công!" : "Đặt hàng thất bại"}
          </Title>
          <Text className="text-gray-600 text-lg">
            {isSuccess
              ? "Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý."
              : "Rất tiếc, đã xảy ra lỗi khi xử lý đơn hàng của bạn. Vui lòng thử lại."}
          </Text>
        </div>

        {isSuccess && orderReturn && (
          <>
            <Divider className="my-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pink-50 p-6 rounded-lg shadow-md">
                <Title level={4} className="text-pink-700 mb-4">
                  Thông tin đơn hàng
                </Title>
                <p className="mb-2">
                  <strong>Mã đơn hàng:</strong> {orderReturn._id}
                </p>
                <p className="mb-2">
                  <strong>Ngày đặt:</strong>{" "}
                  {formatDateOrder(orderReturn.createdAt)}
                </p>
                <p className="mb-2">
                  <strong>Tổng tiền:</strong>{" "}
                  <span className="text-pink-600 font-semibold">
                    {formatPrice(orderReturn.totalAmount)} đ
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {orderReturn.paymentMethod}
                </p>
                <Tag color="pink" className="mt-2">
                  {orderReturn.status}
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
        <div className="flex justify-center space-x-4">
          <Button
            type="primary"
            icon={<HomeOutlined />}
            size="large"
            onClick={handleHomePage}
            className="bg-pink-600 hover:bg-pink-700 border-pink-600 hover:border-pink-700"
          >
            Trang chủ
          </Button>
          <Button
            icon={<GiftOutlined />}
            size="large"
            onClick={handleContinueShopping}
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderReturn;
