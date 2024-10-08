import { createSlice } from "@reduxjs/toolkit";
import { getListPromotion } from "./promotion.thunk";

const initialState = {
    promotions: [],
    isLoading: false,
    error: {},
    pagination: {
        page: 1,
        pageSize: 10,
        totalItems: 0,
        totalPage: 0,
    },
};

export const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Get promotion list admin
            .addCase(getListPromotion.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getListPromotion.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isLoading = false;
                    state.promotions = action.payload.data;
                    state.pagination = action.payload.pagination;
                }
            })
            .addCase(getListPromotion.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { } = promotionSlice.actions;
export default promotionSlice.reducer;
