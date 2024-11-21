import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
});

export const BookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
