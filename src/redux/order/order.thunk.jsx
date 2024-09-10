import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "../../axios/axios";
import { delay } from "../../helpers/delay";

export const orderVnpay = createAsyncThunk(
  "order/orderVnpay",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/order-vnpay", payload);
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
      const res = await axios.post("/order-cod", payload);
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
      const res = await axios.post("/order-stripe", payload);
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
      const res = await axios.get(
        `/orders?status=${payload.status}&page=${payload.page}&pageSize=${payload.pageSize}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderVnpayReturn = createAsyncThunk(
  "order/orderVnpayReturn",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/order-vnpay-return", payload);
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
        `/order-stripe-return?stripeSessionId=${payload.stripeSessionId}&orderSessionId=${payload.orderSessionId}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatuByCustomer = createAsyncThunk(
  "order/updateStatuByCustomer",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/order-status/${payload.id}`, {
        status: payload.status,
      });
      return res;
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
