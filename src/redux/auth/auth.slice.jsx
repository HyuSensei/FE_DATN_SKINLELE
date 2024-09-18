import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountUser,
  loginUser,
  registerUser,
  resetPassword,
  sendOtp,
  updateAccount,
  verifyAccount,
} from "./auth.thunk";
import { remove } from "../../storage/storage";

const initialState = {
  userInfo: {},
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
    logoutUser(state, action) {
      remove("ACCESS_TOKEN");
      state.isAuthenticated = false;
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //Login Customer
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userInfo = action.payload.user;
          state.isAuthenticated = true;
          state.error = {};
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Register Customer
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.error = {};
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get Account Customer
      .addCase(getAccountUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAccountUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userInfo = action.payload.data;
          state.isAuthenticated = true;
          state.error = {};
        }
      })
      .addCase(getAccountUser.rejected, (state, action) => {
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
export const { setEmailVerify, logoutUser } = authSlice.actions;
export default authSlice.reducer;
