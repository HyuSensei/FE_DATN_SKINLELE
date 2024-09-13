import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { message } from "antd";

export const createReview = createAsyncThunk(
  "review/createReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/review", payload);
      return res;
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviewProduct = createAsyncThunk(
  "review/getReviewProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/reviews/${payload.slug}?page=${payload.page}&pageSize=${payload.pageSize}&rate=${payload.rate}&hasComment=${payload.hasComment}&hasImage=${payload.hasImage}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviewList = createAsyncThunk(
  "review/getReviewList",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/admin/reviews/customerName=${payload.name}?page=${payload.page}&pageSize=${payload.pageSize}&rate=${payload.rate}&fromDate=${payload.fromDate}&rate=${payload.toDate}&productName=${payload.productName}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
