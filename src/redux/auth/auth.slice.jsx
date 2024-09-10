import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountCustomer,
  loginCustomer,
  registerCustomer,
  resetPassword,
  sendOtp,
  updateAccount,
  verifyAccount,
} from "./auth.thunk";
import { remove } from "../../storage/storage";

const initialState = {
  userInfor: {},
  isLoading: false,
  error: {},
  isAuthenticated: false,
  emailVerify: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmailVerify(state, action) {
      state.emailVerify = action.payload;
    },
    logoutCustomer(state, action) {
      remove("ACCESS_TOKEN");
      state.isAuthenticated = false;
      state.userInfor = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //Login Customer
      .addCase(loginCustomer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userInfor = action.payload.user;
          state.isAuthenticated = true;
          state.error = {};
        }
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Register Customer
      .addCase(registerCustomer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.error = {};
        }
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get Account Customer
      .addCase(getAccountCustomer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAccountCustomer.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userInfor = action.payload.data;
          state.isAuthenticated = true;
          state.error = {};
        }
      })
      .addCase(getAccountCustomer.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Register Customer
      .addCase(sendOtp.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.error = {};
        }
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Verify Otp
      .addCase(verifyAccount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.error = {};
        }
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Reset Password
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.error = {};
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //Update Account
      .addCase(updateAccount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});
export const { setEmailVerify, logoutCustomer } = authSlice.actions;
export default authSlice.reducer;
