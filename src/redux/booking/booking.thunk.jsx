import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";
import { message } from "antd";

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/bookings", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusBooking = createAsyncThunk(
  "booking/updateStatusBooking",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(`/bookings/status/${id}`, data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);


