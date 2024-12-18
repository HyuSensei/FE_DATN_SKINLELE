import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking(state, action) {
      state.booking = action.payload;
    },
  },
});

export const BookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
