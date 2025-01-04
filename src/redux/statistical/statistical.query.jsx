import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@axios/axios";

export const statisticalApi = createApi({
  reducerPath: "statisticalApi",
  baseQuery: async (args, api, extraOptions) => {
    const { url, method, data, params } = args;
    return baseQuery({ url, method, data, params });
  },
  endpoints: (builder) => ({
    getStatsClinicOverview: builder.query({
      query: ({ year = "", month = "", clinicId }) => ({
        url: `/admin/clinics/statistical-overview/${clinicId}?year=${year}&month=${month}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getStatsClinicDetail: builder.query({
      query: ({ year = "", month = "", clinicId }) => ({
        url: `/admin/clinics/statistical-detail/${clinicId}?year=${year}&month=${month}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getStatsAdminOverview: builder.query({
      query: ({ year = "", month = "" }) => ({
        url: `/admin/statistical/overview?year=${year}&month=${month}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getStatsAdminRevenueOrder: builder.query({
      query: ({ year = "", month = "", type = "" }) => ({
        url: `/admin/statistical/revenue-order?year=${year}&month=${month}&type=${type}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getStatsAdminOrderDetail: builder.query({
      query: ({ year = "", month = "", type = "" }) => ({
        url: `/admin/statistical/order-detail?year=${year}&month=${month}&type=${type}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getStatsAdminReview: builder.query({
      query: ({ year = "", month = "", type = "" }) => ({
        url: `/admin/statistical/review-detail?year=${year}&month=${month}&type=${type}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetStatsClinicOverviewQuery,
  useGetStatsClinicDetailQuery,
  useGetStatsAdminOverviewQuery,
  useGetStatsAdminRevenueOrderQuery,
  useGetStatsAdminOrderDetailQuery,
  useGetStatsAdminReviewQuery,
} = statisticalApi;
