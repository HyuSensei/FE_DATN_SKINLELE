import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  updateProduct,
  getProductAdmin,
  getDetailProduct,
  getProductHome,
  getProductSearch,
  getProductByCategory,
  getAllProductOther,
  getAllProductPromitionAdd,
  getProductPromotion,
} from "./product.thunk";

const initialState = {
  products: [],
  collections: [],
  productDetail: {},
  isLoading: false,
  error: {},
  paginateAdmin: {
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  },
  pagination: {
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  },
  data: {},
  productSearchs: [],
  filters: {
    priceRanges: [],
    brands: [],
    subcategories: [],
    tags: [],
    categories: [],
  },
  category: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, payload) {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get Product Search
      .addCase(getProductSearch.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductSearch.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.productSearchs = action.payload.data;
        }
      })
      .addCase(getProductSearch.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get Product By Category
      .addCase(getProductByCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.products = action.payload.data;
          state.pagination = action.payload.pagination;
          state.filters = action.payload.filters;
          state.category = action.payload.category;
        }
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get Product Home
      .addCase(getProductHome.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductHome.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.collections = action.payload.data;
          state.isLoading = false;
        }
      })
      .addCase(getProductHome.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get Product Detail
      .addCase(getDetailProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDetailProduct.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.productDetail = action.payload.data;
        }
      })
      .addCase(getDetailProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get Product Admin
      .addCase(getProductAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductAdmin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.products = action.payload.data;
          state.paginateAdmin = action.payload.pagination;
        }
      })
      .addCase(getProductAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Create Product
      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.data = action.payload;
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Update Product
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Get all other Product
      .addCase(getAllProductOther.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProductOther.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.products = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getAllProductOther.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get product add promotion
      .addCase(getAllProductPromitionAdd.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProductPromitionAdd.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.products = action.payload.data;
          state.paginateAdmin = action.payload.pagination;
        }
      })
      .addCase(getAllProductPromitionAdd.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Get product promotion by user
      .addCase(getProductPromotion.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductPromotion.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.products = action.payload.data;
          state.pagination = action.payload.pagination;
          state.filters = action.payload.filters;
        }
      })
      .addCase(getProductPromotion.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
