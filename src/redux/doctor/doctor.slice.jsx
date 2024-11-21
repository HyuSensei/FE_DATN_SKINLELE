import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
});

export const DoctorActions = doctorSlice.actions;
export default doctorSlice.reducer;
