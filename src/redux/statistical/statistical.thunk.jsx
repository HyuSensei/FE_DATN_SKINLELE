import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getStatisticalAdmin = createAsyncThunk(
  "statistical/getStatisticAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/admin/statistical?month=${payload.month}&year=${payload.year}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
