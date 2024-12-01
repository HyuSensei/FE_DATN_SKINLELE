import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";
import { message } from "antd";

export const getProductAdmin = createAsyncThunk(
  "product/getProductAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/admin/products?page=${payload.page}&pageSize=${
          payload.pageSize
        }&name=${payload.name || ""}&category=${payload.category || ""}&brand=${
          payload.brand || ""
        }&tag=${payload.tag || ""}&sort=${payload.sort || "asc"}`
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/admin/products", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.put(`/admin/products/${payload.id}`, payload.data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.delete(`/admin/products/${payload}`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  async (slug, { rejectWithValue }) => {
    try {
      return await axios.get(`/products/detail/${slug}`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductHome = createAsyncThunk(
  "product/getProductHome",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get(`/products/home?tags=HOT,NEW,SALE`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductSearch = createAsyncThunk(
  "product/getProductSearch",
  async (search, { rejectWithValue }) => {
    try {
      return await axios.get(`/products/search?search=${search}`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/products/categories/${payload.slug}?page=${payload.page}&pageSize=${payload.pageSize}&priceRange=${payload.priceRange}&brands=${payload.brands}&sortOrder=${payload.sortOrder}&tags=${payload.tags}&subcategoriesList=${payload.subcategoriesList}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductOther = createAsyncThunk(
  "product/getallProductOther",
  async (payload, { rejectWithValue }) => {
    try {
      const productList = await axios.get(
        `/products/all-other?page=${payload.page}&pageSize=${payload.pageSize}`
      );
      return productList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductPromitionAdd = createAsyncThunk(
  "product/getAllProductPromitionAdd",
  async (payload, { rejectWithValue }) => {
    try {
      const productList = await axios.get(
        `/admin/products/promotion-create?page=${payload.page}&pageSize=${payload.pageSize}`
      );
      return productList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductPromotion = createAsyncThunk(
  "product/getProductPromotion",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/products/promotions?page=${payload.page}&pageSize=${payload.pageSize}&priceRange=${payload.priceRange}&brands=${payload.brands}&sortOrder=${payload.sortOrder}&tags=${payload.tags}&categoriesList=${payload.categoriesList}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductAlmostExpired = createAsyncThunk(
  "product/getProductAlmostExpired",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/products/almost-expired?page=${payload.page}&pageSize=${payload.pageSize}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
