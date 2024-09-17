import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/users?page=${payload.page}&pageSize=${payload.pageSize}&search=${payload.search}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
