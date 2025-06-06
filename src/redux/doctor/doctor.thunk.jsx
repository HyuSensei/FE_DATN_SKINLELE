import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@axios/axios";
import { message } from "antd";

export const getAllDoctorByAdmin = createAsyncThunk(
  "doctor/getAllDoctorByAdmin",
  async ({ page = 1, pageSize = 10, name = "" }, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/doctors?page=${page}&pageSize=${pageSize}&name=${name}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDoctorByAdmin = createAsyncThunk(
  "doctor/createDoctorByAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/admin/doctors", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDoctorByAdmin = createAsyncThunk(
  "doctor/updateDoctorByAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(`/admin/doctors/${id}`, data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeDoctorByAdmin = createAsyncThunk(
  "doctor/removeDoctorByAdmin",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.delete(`/admin/doctors/${id}`);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createScheduleByDoctor = createAsyncThunk(
  "doctor/createScheduleByDoctor",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post(`/doctors/schedule`, payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateScheduleByDoctor = createAsyncThunk(
  "doctor/updateScheduleByDoctor",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(`/doctors/schedule/${id}`, data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDoctorInfor = createAsyncThunk(
  "doctor/updateDoctorInfor",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(`/doctors/${id}`, data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReviewDoctor = createAsyncThunk(
  "doctor/createReviewDoctor",
  async (payload, { rejectWithValue }) => {
    try {
      return await axios.post("/doctors/reviews", payload);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReviewDoctor = createAsyncThunk(
  "doctor/updateReviewDoctor",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await axios.put(`/doctors/reviews/${id}`, data);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeReviewDoctor = createAsyncThunk(
  "doctor/removeReviewDoctor",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.delete(`/doctors/reviews/${id}`);
    } catch (error) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

