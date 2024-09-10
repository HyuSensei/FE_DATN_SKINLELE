import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getBrandByCreatePro = createAsyncThunk(
  "brand/getBrandByCreatePro",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/admin/brands");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
