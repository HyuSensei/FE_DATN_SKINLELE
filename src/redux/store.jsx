import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { clinicApi } from "./clinic/clinic.query";
import { doctorApi } from "./doctor/doctor.query";
import { bookingApi } from "./booking/booking.query";

export const store = configureStore({
  reducer: {
    ...reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      doctorApi.middleware,
      clinicApi.middleware,
      bookingApi.middleware
    ),
});
