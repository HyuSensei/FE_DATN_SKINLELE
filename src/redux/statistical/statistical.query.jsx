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
  }),
});

export const { useGetStatsClinicOverviewQuery, useGetStatsClinicDetailQuery } =
  statisticalApi;
