import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "@axios/axios";

export const orderVnpay = createAsyncThunk(
  "order/orderVnpay",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/orders/vnpay", payload);
      return res;
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderCod = createAsyncThunk(
  "order/orderCod",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/orders/cod", payload);
      return res;
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderStripe = createAsyncThunk(
  "order/orderStripe",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/orders/stripe", payload);
      return res;
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderHistory = createAsyncThunk(
  "order/getOrderHistory",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/orders?status=${payload.status}&page=${payload.page}&pageSize=${payload.pageSize}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderVnpayReturn = createAsyncThunk(
  "order/orderVnpayReturn",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/orders/vnpay-return", payload);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderStripeReturn = createAsyncThunk(
  "order/orderStripeReturn",
  async (payload, { rejectWithValue }) => {
    try {
      // await delay(5000);
      const res = await axios.get(
        `/orders/stripe-return?stripeSessionId=${payload.stripeSessionId}&orderSessionId=${payload.orderSessionId}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderListAdmin = createAsyncThunk(
  "order/getOrderListAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/admin/orders?page=${payload.page}&pageSize=${payload.pageSize
        }&status=${payload.status || ""}&search=${payload.search || ""}&paymentMethod=${payload.paymentMethod || ""}&fromDate=${payload.fromDate || ""}&toDate=${payload.toDate || ""}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(
        `/admin/orders/${id}`, data
      );
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.delete(
        `/admin/orders/${id}`
      );
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  "order/getOrderDetail",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/orders/${id}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateOrderByUser = createAsyncThunk(
  "order/updateOrderByUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(
        `/orders/${id}`, data
      );
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusOrderByUser = createAsyncThunk(
  "order/updateStatusOrderByUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(
        `/orders/status/${id}`, data
      );
    } catch (error) {
      message.warning(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);


