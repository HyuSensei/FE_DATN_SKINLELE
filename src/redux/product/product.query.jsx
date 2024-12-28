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
  }),
});

export const {
  useGetProductDetailQuery,
  useGetProductHomeQuery,
  useGetProductAddPromotionQuery,
} = productApi;
