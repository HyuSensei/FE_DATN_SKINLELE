import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";

export const getAllClinicAdmin = createAsyncThunk(
  "clinic/getAllClinicAdmin",
  async ({ page = 1, pageSize = 10, search = "" }, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/clinics?${page}&pageSize=${pageSize}&search=${search}`
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


