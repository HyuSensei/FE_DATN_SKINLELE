import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { message } from "antd";

export const loginCustomer = createAsyncThunk(
  "auth/loginCustomer",
  async (data, { rejectWithValue }) => {
    try {
      return await axios.post("/auth/login", data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerCustomer = createAsyncThunk(
  "auth/registerCustomer",
  async (data, { rejectWithValue }) => {
    try {
      return await axios.post("/auth/register", data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAccountCustomer = createAsyncThunk(
  "auth/getAccountCustomer",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/auth/account");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/auth/send-otp", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/auth/verify-otp", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/auth/reset-password", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.put("/auth/account", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

