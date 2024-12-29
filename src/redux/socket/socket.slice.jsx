import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketCustomer: null,
  socketAdmin: null,
  socketDoctor: null,
  userOnlines: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketCustomer(state, action) {
      state.socketCustomer = action.payload;
    },
    setSocketAdmin(state, action) {
      state.socketAdmin = action.payload;
    },
    setSocketDoctor(state, action) {
      state.socketDoctor = action.payload;
    },
    setUserOnlines(state, action) {
      state.userOnlines = action.payload;
    },
  },
});

export const SocketActions = socketSlice.actions;
export default socketSlice.reducer;
