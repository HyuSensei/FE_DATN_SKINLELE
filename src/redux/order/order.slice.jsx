import { createSlice } from "@reduxjs/toolkit";
import {
  orderVnpay,
  orderVnpayReturn,
  getOrderHistory,
  orderCod,
  orderStripe,
  orderStripeReturn,
  getOrderListAdmin,
  getOrderDetail,
} from "./order.thunk";

const initialState = {
  isLoading: false,
  error: {},
  order: {},
  orders: [],
  orderReturn: {},
  orderHistories: [],
  pagination: {
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  },
  statusCounts: {
    pending: 0,
    processing: 0,
    shipping: 0,
    delivered: 0,
    cancelled: 0,
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderReturn(state, action) {
      state.orderReturn = action.payload;
    },
    setOrderHistories(state, action) {
      state.orderHistories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Order Vnpay
      .addCase(orderVnpay.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(orderVnpay.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(orderVnpay.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Order Cod
      .addCase(orderCod.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(orderCod.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(orderCod.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Order Stripe
      .addCase(orderStripe.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(orderStripe.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(orderStripe.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Order vnpay return
      .addCase(orderVnpayReturn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(orderVnpayReturn.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.orderReturn = action.payload.data;
          state.isLoading = false;
        }
      })
      .addCase(orderVnpayReturn.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Order stripe return
      .addCase(orderStripeReturn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(orderStripeReturn.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.orderReturn = action.payload.data;
          state.isLoading = false;
        }
      })
      .addCase(orderStripeReturn.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Order History
      .addCase(getOrderHistory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.orderHistories = action.payload.data;
          state.pagination = action.payload.pagination;
          state.statusCounts = action.payload.statusCounts;
          state.isLoading = false;
        }
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Update status order by admin
      .addCase(getOrderListAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderListAdmin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.orders = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getOrderListAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get order detail admin
      .addCase(getOrderDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.order = action.payload.data;
        }
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  },
});

export const { setOrderReturn, setOrderHistories } = orderSlice.actions;
export default orderSlice.reducer;
