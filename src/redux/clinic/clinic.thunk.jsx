import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

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
