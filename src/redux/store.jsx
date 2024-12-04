import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { clinicApi } from "./clinic/clinic.query";
import { doctorApi } from "./doctor/doctor.query";

export const store = configureStore({
  reducer: {
    ...reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(doctorApi.middleware, clinicApi.middleware),
});
