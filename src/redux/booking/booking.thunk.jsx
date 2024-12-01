import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";

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
