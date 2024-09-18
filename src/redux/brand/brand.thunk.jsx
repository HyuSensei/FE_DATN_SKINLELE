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

export const getBrandList = createAsyncThunk(
  "brand/getBrandList",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/brands?page=${payload.page}&pageSize=${payload.pageSize}&name=${payload.name}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBrand = createAsyncThunk(
  "brand/getAllBrand",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get(`/brands`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
