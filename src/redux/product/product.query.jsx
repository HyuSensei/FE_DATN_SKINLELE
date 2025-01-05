import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@axios/axios";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: async (args, api, extraOptions) => {
    const { url, method, data, params } = args;
    return baseQuery({ url, method, data, params });
  },
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      query: ({ slug }) => ({
        url: `/products/detail/${slug}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getProductHome: builder.query({
      query: () => ({
        url: "/products/home?tags=HOT,NEW,SALE",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getProductAddPromotion: builder.query({
      query: ({ name, sort }) => ({
        url: `/admin/products/promotion-create?name=${name}&sort=${sort}`,
        method: "GET",
      }),
    }),
    getFilterOptions: builder.query({
      query: () => ({
        url: "/products/filter-options",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getProductFromCategory: builder.query({
      query: ({
        page = 1,
        pageSize = 12,
        priceRange = "",
        brands = [],
        rating = "",
        categories = [],
        tags = [],
        sortOrder = "",
        slug,
      }) => {
        const queryString = new URLSearchParams({
          priceRange,
          brands,
          rating,
          categories,
          tags,
          sortOrder,
          page,
          pageSize,
        }).toString();
        return {
          url: `/products/categories/${slug}?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getProductFromBrand: builder.query({
      query: ({
        page = 1,
        pageSize = 12,
        priceRange = "",
        rating = "",
        categories = [],
        tags = [],
        sortOrder = "",
        slug,
      }) => {
        const queryString = new URLSearchParams({
          priceRange,
          rating,
          categories,
          tags,
          sortOrder,
          page,
          pageSize,
        }).toString();
        return {
          url: `/products/brands/${slug}?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getProductPromtion: builder.query({
      query: ({
        page = 1,
        pageSize = 12,
        priceRange = "",
        brands = [],
        rating = "",
        categories = [],
        tags = [],
        sortOrder = "",
      }) => {
        const queryString = new URLSearchParams({
          priceRange,
          rating,
          categories,
          tags,
          sortOrder,
          page,
          brands,
          pageSize,
        }).toString();
        return {
          url: `/products/promotions?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getAllProductByAdmin: builder.query({
      query: ({
        page = 1,
        pageSize = 10,
        name = "",
        category = "",
        brand = "",
        tag = "",
        sort = "asc",
      }) => {
        const queryString = new URLSearchParams({
          page,
          pageSize,
          name,
          category,
          brand,
          tag,
          sort,
        }).toString();
        return {
          url: `/admin/products?${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetProductDetailQuery,
  useGetProductHomeQuery,
  useGetProductAddPromotionQuery,
  useGetFilterOptionsQuery,
  useGetProductFromCategoryQuery,
  useGetProductFromBrandQuery,
  useGetProductPromtionQuery,
  useGetAllProductByAdminQuery,
} = productApi;
