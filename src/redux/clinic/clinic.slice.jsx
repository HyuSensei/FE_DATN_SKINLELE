import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {},
});

export const ClinicActions = clinicSlice.actions;
export default clinicSlice.reducer;
