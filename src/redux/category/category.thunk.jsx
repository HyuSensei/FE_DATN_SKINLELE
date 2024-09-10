import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

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
  async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async () => {
    try {
    } catch (error) {
      console.log(error);
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
