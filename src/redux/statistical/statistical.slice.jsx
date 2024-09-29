import { createSlice } from "@reduxjs/toolkit";
import { getStatisticalAdmin } from "./statistical.thunk";
const initialState = {
  isLoading: false,
  error: {},
  totalOrders: 0,
  totalProducts: 0,
  totalCustomers: 0,
  totalOrderAmount: 0,
  monthlyRevenue: [],
  topSellingProducts: [],
  topReviewedProducts: [],
};

export const statisticalSlice = createSlice({
  name: "statistical",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get statistical by admin
      .addCase(getStatisticalAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getStatisticalAdmin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.totalOrders = action.payload.data.totals.orders;
          state.totalProducts = action.payload.data.totals.products;
          state.totalCustomers = action.payload.data.totals.customers;
          state.totalOrderAmount = action.payload.data.totals.revenue;
          state.monthlyRevenue = action.payload.data.yearlyStats;
          state.topSellingProducts = action.payload.data.topSellingProducts;
          state.topReviewedProducts = action.payload.data.topReviewedProducts;
        }
      })
      .addCase(getStatisticalAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {} = statisticalSlice.actions;
export default statisticalSlice.reducer;
