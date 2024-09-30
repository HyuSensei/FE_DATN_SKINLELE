import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCategory,
  getAllCategoryFilter,
  getCategoryAdmin,
  getCategoryByCreatePro,
  getCategoryList,
} from "./category.thunk";

const initialState = {
  categories: [],
  isLoading: false,
  error: {},
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPage: 0,
  },
  categoriesAll: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //Get category by create product
      .addCase(getCategoryByCreatePro.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategoryByCreatePro.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.categories = action.payload.data;
        }
      })
      .addCase(getCategoryByCreatePro.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get category by use
      .addCase(getAllCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.categories = action.payload.data;
        }
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get category by admin
      .addCase(getCategoryAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategoryAdmin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.categoriesAll = action.payload.data;
        }
      })
      .addCase(getCategoryAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get category by admin filter product
      .addCase(getAllCategoryFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCategoryFilter.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.categories = action.payload.data;
        }
      })
      .addCase(getAllCategoryFilter.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get category by admin list
      .addCase(getCategoryList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.categories = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
