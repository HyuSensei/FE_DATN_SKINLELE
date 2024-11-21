import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supportMessages: [],
  customerMessages: [],
  doctorMessages: [],
  supportConversation: null,
  customerConversation: null,
  doctorConversation: null,
  doctorId: "",
  adminId: "",
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
  },
});

export const SocketActions = socketSlice.actions;
export default socketSlice.reducer;
