import { createSlice } from "@reduxjs/toolkit";
import { getBrandByCreatePro, getBrandList } from "./brand.thunk";

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
      //Get brand add product
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
      })

      //Get brand admin
      .addCase(getBrandList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBrandList.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.brands = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getBrandList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default brandSlice.reducer;
