import { createSlice } from "@reduxjs/toolkit";
import { getBrandByCreatePro } from "./brand.thunk";

const initialState = {
  brands: [],
  isLoading: false,
  error: {},
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPage: 0,
  },
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandByCreatePro.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBrandByCreatePro.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.brands = action.payload.data;
        }
      })
      .addCase(getBrandByCreatePro.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default brandSlice.reducer;
