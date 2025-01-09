import productReducer from "./product/product.slice";
import categoryReducer from "./category/category.slice";
import authReducer from "./auth/auth.slice";
import cartReducer from "./cart/cart.slice";
import shipReducer from "./ship/ship.slice";
import orderReducer from "./order/order.slice";
import reviewReducer from "./review/review.slice";
import brandReducer from "./brand/brand.slice";
import userReducer from "./user/user.slice";
import statisticalReducer from "./statistical/statistical.slice";
import promotionReducer from "./promotion/promotion.slice";
import socketReducer from "./socket/socket.slice";
import doctorReducer from "./doctor/doctor.slice";
import bookingReducer from "./booking/booking.slice";
import chatReducer from "./chat/chat.slice";
import notificationReducer from "./notification/notification.slice";

const reducer = {
  product: productReducer,
  category: categoryReducer,
  auth: authReducer,
  cart: cartReducer,
  ship: shipReducer,
  order: orderReducer,
  review: reviewReducer,
  brand: brandReducer,
  user: userReducer,
  statistical: statisticalReducer,
  promotion: promotionReducer,
  socket: socketReducer,
  doctor: doctorReducer,
  booking: bookingReducer,
  chat: chatReducer,
  notification: notificationReducer,
};

export default reducer;
