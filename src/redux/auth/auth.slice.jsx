import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountAdmin,
  getAccountUser,
  loginAdmin,
  loginUser,
  registerUser,
  resetPassword,
  sendOtp,
  updateAccount,
  verifyAccount,
} from "./auth.thunk";
import { remove } from "@storage/storage";

const initialState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    avatar: {
      url: "",
      publicId: "",
    },
    googleId: "",
  },
  isLoading: false,
  error: {},
  isAuthenticated: false,
  isAuthenticatedAdmin: false,
  isAuthenticatedDoctor: false,
  emailVerify: "",
  adminInfo: {
    _id: "",
    name: "",
    username: "",
    role: "",
    avatar: {
      url: "",
      publicId: "",
    },
    clinic: null,
  },
  doctorInfo: {
    _id: "",
    name: "",
    email: "",
    about: "",
    avatar: {
      url: "",
      publicId: "",
    },
    phone: "",
    fees: 0,
    specialty: "",
    experience: 0,
    slug: "",
    clinic: {},
    schedule: [],
    holidays: [],
  },
  openModelAuth: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOpenModelAuth(state, action) {
      state.openModelAuth = action.payload;
    },
    setEmailVerify(state, action) {
      state.emailVerify = action.payload;
    },
    logoutUser(state, action) {
      remove("ACCESS_TOKEN");
      remove("cart");
      state.isAuthenticated = false;
      state.userInfo = {};
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logoutAdmin(state, action) {
      remove("ACCESS_TOKEN_ADMIN");
      state.isAuthenticatedAdmin = false;
      state.adminInfo = {};
    },
    setIsAuthenticatedDoctor(state, action) {
      state.isAuthenticatedDoctor = action.payload;
    },
    setDoctorInfo(state, action) {
      state.doctorInfo = action.payload;
    },
    logoutDoctor(state, action) {
      remove("ACCESS_TOKEN_DOCTOR");
      state.isAuthenticatedDoctor = false;
      state.doctorInfo = {};
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
      })

      //Login Admin
      .addCase(loginAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.adminInfo = action.payload.data;
          state.isAuthenticatedAdmin = true;
          state.error = {};
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Get Account Admin
      .addCase(getAccountAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAccountAdmin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.adminInfo = action.payload.data;
          state.isAuthenticatedAdmin = true;
          state.error = {};
        }
      })
      .addCase(getAccountAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isAuthenticatedAdmin = false;
      });
  },
});
export const {
  setEmailVerify,
  logoutUser,
  setUserInfo,
  logoutAdmin,
  setOpenModelAuth,
  setDoctorInfo,
  setIsAuthenticatedDoctor,
  logoutDoctor,
} = authSlice.actions;
export default authSlice.reducer;
