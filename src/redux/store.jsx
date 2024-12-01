import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { clinicApi } from "./clinic/clinic.query";

export const store = configureStore({
  reducer: {
    ...reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(clinicApi.middleware),
});
