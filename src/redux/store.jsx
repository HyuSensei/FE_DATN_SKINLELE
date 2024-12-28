import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { clinicApi } from "./clinic/clinic.query";
import { doctorApi } from "./doctor/doctor.query";
import { bookingApi } from "./booking/booking.query";
import { statisticalApi } from "./statistical/statistical.query";
import { productApi } from "./product/product.query";

export const store = configureStore({
  reducer: {
    ...reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [statisticalApi.reducerPath]: statisticalApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      doctorApi.middleware,
      clinicApi.middleware,
      bookingApi.middleware,
      statisticalApi.middleware,
      productApi.middleware
    ),
});
