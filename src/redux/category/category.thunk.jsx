import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";
import { message } from "antd";

export const getCategoryAdmin = createAsyncThunk(
  "category/getCategoryAdmin",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/admin/categories");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/categories");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/admin/categories", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.put(`/admin/categories/${payload.id}`, payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.delete(`/admin/categories/${id}`);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategoryByCreatePro = createAsyncThunk(
  "category/getCategoryByCreatePro",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/admin/categories");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCategoryFilter = createAsyncThunk(
  "category/getAllCategoryFilter",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/admin/categories/filter");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategoryList = createAsyncThunk(
  "category/getCategoryList",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/categories?page=${payload.page}&pageSize=${payload.pageSize}&name=${payload.name || ""}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
