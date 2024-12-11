import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";
import { message } from "antd";

export const getAllBookingByAdmin = createAsyncThunk(
  "booking/getAllBookingByAdmin",
  async (
    { page = 1, pageSize = 10, status = "", date = "" },
    { rejectWithValue }
  ) => {
    try {
      return await axios.get(
        `/admin/clinics/bookings?page=${page}&pageSize=${pageSize}&status=${status}&date=${date}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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


