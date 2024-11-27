import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const getAllDoctorByAdmin = createAsyncThunk(
  "doctor/getAllDoctorByAdmin",
  async ({ page = 1, pageSize = 10, name = "" }, { rejectWithValue }) => {
    try {
      return await axios.get(
        `/admin/doctors?${page}&pageSize=${pageSize}&name=${name}`
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
