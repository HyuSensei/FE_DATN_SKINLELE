// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   Steps,
//   Typography,
//   Tag,
//   Divider,
//   Button,
//   List,
//   Avatar,
// } from "antd";
// import {
//   CheckCircleFilled,
//   CloseCircleFilled,
//   ShoppingOutlined,
//   ClockCircleOutlined,
//   CarOutlined,
//   SmileOutlined,
//   HomeOutlined,
//   GiftOutlined,
// } from "@ant-design/icons";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { orderStripeReturn, orderVnpayReturn } from "@redux/order/order.thunk";
// import { formatDateOrder } from "@helpers/formatDate";
// import { formatPrice } from "@helpers/formatPrice";
// import Loading from "@components/Loading/Loading";
// import { removeProductAfterOrderSuccess } from "@redux/cart/cart.slice";
// import isEmpty from "lodash/isEmpty";

// const { Title, Text } = Typography;

// const OrderReturn = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isSuccess, setIsSuccess] = useState(true);
//   const queryParams = new URLSearchParams(location.search);
//   const { orderReturn, isLoading, error } = useSelector((state) => state.order);
//    const { socketCustomer: socket } = useSelector((state) => state.socket);

//   const orderId = queryParams.get("vnp_TxnRef");
//   const code = queryParams.get("vnp_ResponseCode");
//   const stripeSessionId = queryParams.get("session_id");
//   const orderSessionId = queryParams.get("order_session") || "";

//   useEffect(() => {
//     if (
//       !orderId &&
//       !code &&
//       !orderReturn._id &&
//       !error.message &&
//       !stripeSessionId &&
//       !orderSessionId
//     ) {
//       navigate("/");
//     }
//   }, [orderReturn._id, orderId, code, error, stripeSessionId, orderSessionId]);

//   useEffect(() => {
//     if (orderId && code) {
//       dispatch(orderVnpayReturn({ orderId, code })).then((res) => {
//         if (res.payload.success) {
//           socket?.emit(
//             "createOrder",
//             JSON.stringify({
//               order: res.payload.data,
//               model: "User",
//               recipient: res.payload.data.user,
//             })
//           );
//           console.log(res.payload);
//           const products = res.payload.data.products;
//           if (products.length > 0) {
//             products.forEach((item) => {
//               dispatch(
//                 removeProductAfterOrderSuccess({
//                   productId: item.productId,
//                   color: item.color,
//                 })
//               );
//             });
//           }
//           setIsSuccess(true);
//           navigate("/order-return");
//         } else {
//           setIsSuccess(false);
//           navigate("/order-return");
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (stripeSessionId || orderSessionId) {
//       dispatch(orderStripeReturn({ stripeSessionId, orderSessionId })).then(
//         (res) => {
//           if (res.payload.success) {
//             socket?.emit(
//               "createOrder",
//               JSON.stringify({
//                 order: res.payload.data,
//                 model: "User",
//                 recipient: res.payload.data.user,
//               })
//             );
//             const products = res.payload.data.products;
//             if (products.length > 0) {
//               products.forEach((item) => {
//                 dispatch(
//                   removeProductAfterOrderSuccess({
//                     productId: item.productId,
//                     color: item.color,
//                   })
//                 );
//               });
//             }
//             setIsSuccess(true);
//             navigate("/order-return");
//           } else {
//             setIsSuccess(false);
//             navigate("/order-return");
//           }
//         }
//       );
//     }
//   }, []);

//   const handleHomePage = () => {
//     navigate("/");
//   };

//   const handleContinueShopping = () => {
//     navigate("/cart");
//   };

//   const OrderStatus = () => (
//     <Steps
//       direction="vertical"
//       current={1}
//       className="custom-steps"
//       items={[
//         {
//           title: "Đơn hàng đã đặt",
//           description: formatDateOrder(orderReturn?.createdAt),
//           icon: <ShoppingOutlined />,
//         },
//         {
//           title: "Đang xử lý",
//           description: "Đơn hàng của bạn đang được xử lý",
//           icon: <ClockCircleOutlined />,
//         },
//         {
//           title: "Đang giao hàng",
//           icon: <CarOutlined />,
//         },
//         {
//           title: "Đã giao hàng",
//           icon: <SmileOutlined />,
//         },
//       ]}
//     />
//   );

//   const OrderSummary = () => (
//     <List
//       itemLayout="horizontal"
//       dataSource={orderReturn?.products}
//       renderItem={(item) => (
//         <List.Item>
//           <List.Item.Meta
//             avatar={<Avatar src={item.image} shape="square" size={64} />}
//             title={<span>{item.name}</span>}
//             description={`${item.quantity} x ${formatPrice(item.price)} đ`}
//           />
//           <div className="font-semibold">
//             {formatPrice(item.price * item.quantity)} đ
//           </div>
//         </List.Item>
//       )}
//     />
//   );

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
//       <Card className="max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
//         <div
//           className={`text-center ${isSuccess ? "text-pink-600" : "text-red-600"
//             }`}
//         >
//           {isSuccess ? (
//             <CheckCircleFilled style={{ fontSize: 80 }} className="mb-4" />
//           ) : (
//             <CloseCircleFilled style={{ fontSize: 80 }} className="mb-4" />
//           )}
//           <div
//             className={`text-xl lg:text-3xl ${isSuccess ? "text-pink-600" : "text-red-600"}`}
//           >
//             {isSuccess ? "Đặt hàng thành công!" : "Đặt hàng thất bại"}
//           </div>
//           <div className="text-gray-600 text-base lg:text-lg">
//             {isSuccess
//               ? "Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý."
//               : "Rất tiếc, đã xảy ra lỗi khi xử lý đơn hàng của bạn. Vui lòng thử lại."}
//           </div>
//         </div>

//         {isSuccess && !isEmpty(orderReturn) && (
//           <>
//             <Divider className="my-8" />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-pink-50 p-6 rounded-lg shadow-md">
//                 <Title level={4} className="text-pink-700 mb-4">
//                   Thông tin đơn hàng
//                 </Title>
//                 <p className="mb-2">
//                   <strong>Mã đơn hàng:</strong> <span className="uppercase">OD{orderReturn._id}</span>
//                 </p>
//                 <p className="mb-2">
//                   <strong>Ngày đặt:</strong>{" "}
//                   {formatDateOrder(orderReturn.createdAt)}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Tổng tiền:</strong>{" "}
//                   <span className="font-semibold">
//                     {formatPrice(orderReturn.totalAmount)} đ
//                   </span>
//                 </p>
//                 <p className="mb-2">
//                   <strong>Phương thức thanh toán:</strong>{" "}
//                   {orderReturn.paymentMethod}
//                 </p>
//                 <Tag color="pink" className="mt-2">
//                   {orderReturn.status === "pending" ? "Đang chờ" : ""}
//                 </Tag>
//               </div>
//               <div className="bg-purple-50 p-6 rounded-lg shadow-md">
//                 <Title level={4} className="text-purple-700 mb-4">
//                   Trạng thái đơn hàng
//                 </Title>
//                 <OrderStatus />
//               </div>
//             </div>

//             <Divider className="my-8" />
//             <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg shadow-md">
//               <Title level={4} className="text-pink-700 mb-4">
//                 Sản phẩm đã đặt
//               </Title>
//               <OrderSummary />
//             </div>
//           </>
//         )}

//         {!isSuccess && error && (
//           <div className="text-center mt-8 bg-red-50 p-6 rounded-lg shadow-md">
//             <Title level={4} className="text-red-600 mb-4">
//               {error.message}
//             </Title>
//             <Text className="text-gray-600">
//               Vui lòng kiểm tra lại thông tin và thử lại
//             </Text>
//           </div>
//         )}

//         <Divider className="my-8" />
//         <div className="flex justify-center gap-4 flex-wrap">
//           <Button
//             icon={<HomeOutlined />}
//             size="large"
//             onClick={handleHomePage}
//             className="bg-pink-600 hover:bg-pink-700 border-pink-600 hover:border-pink-700 text-white"
//           >
//             Trang chủ
//           </Button>
//           <Button
//             icon={<GiftOutlined />}
//             size="large"
//             onClick={handleContinueShopping}
//             className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
//           >
//             Tiếp tục mua sắm
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default OrderReturn;


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

  const orderId = queryParams.get("vnp_TxnRef");
  const code = queryParams.get("vnp_ResponseCode");
  const stripeSessionId = queryParams.get("session_id");
  const orderSessionId = queryParams.get("order_session") || "";

  // Điều hướng nếu không có thông tin hợp lệ
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

  // Xử lý đơn hàng VNPay
  useEffect(() => {
    const handleVnpayReturn = async () => {
      if (orderId && code) {
        try {
          const res = await dispatch(orderVnpayReturn({ orderId, code })).unwrap();

          // Emit sự kiện tạo đơn hàng qua socket
          socket?.emit("createOrder", {
            order: res.data,
            model: "User",
            recipient: res.data.user,
          });

          // Xóa sản phẩm đã đặt thành công khỏi giỏ hàng
          if (res.data.products?.length > 0) {
            for (const item of res.data.products) {
              dispatch(
                removeProductAfterOrderSuccess({
                  productId: item.productId,
                  color: item.color,
                })
              );
            }
          }

          setIsSuccess(true);
          navigate("/order-return");
        } catch (err) {
          setIsSuccess(false);
          navigate("/order-return");
        }
      }
    };

    handleVnpayReturn();
  }, [orderId, code, dispatch, socket, navigate]);

  // Xử lý đơn hàng Stripe
  useEffect(() => {
    const handleStripeReturn = async () => {
      if (stripeSessionId || orderSessionId) {
        try {
          const res = await dispatch(orderStripeReturn({ stripeSessionId, orderSessionId })).unwrap();

          // Emit sự kiện tạo đơn hàng qua socket
          socket?.emit("createOrder", {
            order: res.data,
            model: "User",
            recipient: res.data.user,
          });

          // Xóa sản phẩm đã đặt thành công khỏi giỏ hàng
          if (res.data.products?.length > 0) {
            for (const item of res.data.products) {
              dispatch(
                removeProductAfterOrderSuccess({
                  productId: item.productId,
                  color: item.color,
                })
              );
            }
          }

          setIsSuccess(true);
          navigate("/order-return");
        } catch (err) {
          setIsSuccess(false);
          navigate("/order-return");
        }
      }
    };

    handleStripeReturn();
  }, [stripeSessionId, orderSessionId, dispatch, socket, navigate]);

  // Điều hướng về trang chủ
  const handleHomePage = () => navigate("/");

  // Tiếp tục mua sắm
  const handleContinueShopping = () => navigate("/cart");

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
          className={`text-center ${isSuccess ? "text-pink-600" : "text-red-600"
            }`}
        >
          {isSuccess ? (
            <CheckCircleFilled style={{ fontSize: 80 }} className="mb-4" />
          ) : (
            <CloseCircleFilled style={{ fontSize: 80 }} className="mb-4" />
          )}
          <div
            className={`text-xl lg:text-3xl ${isSuccess ? "text-pink-600" : "text-red-600"}`}
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
                  <strong>Mã đơn hàng:</strong> <span className="uppercase">OD{orderReturn._id}</span>
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
          <Button
            icon={<HomeOutlined />}
            size="large"
            onClick={handleHomePage}
            className="bg-pink-600 hover:bg-pink-700 border-pink-600 hover:border-pink-700 text-white"
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
