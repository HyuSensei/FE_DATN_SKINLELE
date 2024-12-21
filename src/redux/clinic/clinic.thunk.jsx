import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";

export const getAllClinicAdmin = createAsyncThunk(
  "clinic/getAllClinicAdmin",
  async ({ page = 1, pageSize = 10, search = "" }, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/clinics?page=${page}&pageSize=${pageSize}&search=${search}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createClinicByAdmin = createAsyncThunk(
  "clinic/createClinicByAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post(`/admin/clinics`, payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateClinicByAdmin = createAsyncThunk(
  "clinic/updateClinicByAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(`/admin/clinics/${id}`, data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateClinicByOwner = createAsyncThunk(
  "clinic/updateClinicByOwner",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/admin/clinics/owner", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeClinicByAdmin = createAsyncThunk(
  "clinic/removeClinicByAdmin",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.delete(`/admin/clinics/${id}`);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getClinicDetailByAdmin = createAsyncThunk(
  "clinic/getClinicDetailByAdmin",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/admin/clinics/detail");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReviewClinic = createAsyncThunk(
  "clinic/createReviewClinic",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/clinics/reviews", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReviewClinic = createAsyncThunk(
  "clinic/updateReviewClinic",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(`/admin/clinics/reviews/${id}`, data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeReviewClinic = createAsyncThunk(
  "clinic/removeReviewClinic",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.delete(`/admin/clinics/reviews/${id}`);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);


