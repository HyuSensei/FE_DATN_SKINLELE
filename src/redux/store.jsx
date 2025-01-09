import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { clinicApi } from "./clinic/clinic.query";
import { doctorApi } from "./doctor/doctor.query";
import { bookingApi } from "./booking/booking.query";
import { statisticalApi } from "./statistical/statistical.query";
import { productApi } from "./product/product.query";
import { categoryApi } from "./category/category.query";
import { brandApi } from "./brand/brand.query";
import { reviewApi } from "./review/review.query";
import { orderApi } from "./order/order.query";
import { notificationApi } from "./notification/notification.query";

export const store = configureStore({
  reducer: {
    ...reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [statisticalApi.reducerPath]: statisticalApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      doctorApi.middleware,
      clinicApi.middleware,
      bookingApi.middleware,
      statisticalApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      brandApi.middleware,
      reviewApi.middleware,
      orderApi.middleware,
      notificationApi.middleware
    ),
});
