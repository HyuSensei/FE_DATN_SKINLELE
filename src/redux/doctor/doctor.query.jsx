import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@axios/axios";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: async (args, api, extraOptions) => {
    const { url, method, data, params } = args;
    return baseQuery({ url, method, data, params });
  },
  endpoints: (builder) => ({
    getStatisticalDoctor: builder.query({
      query: ({ year, month }) => ({
        url: `/doctors/statistical?year=${year}&month=${month}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getAllReviews: builder.query({
      query: ({ page = 1, pageSize = 10, rate = "", doctor }) => {
        const queryStrings = new URLSearchParams({
          page,
          pageSize,
          rate,
        }).toString();
        return {
          url: `/doctors/reviews/${doctor}?${queryStrings}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getDoctorsByCustomer: builder.query({
      query: ({ page, pageSize, search = "", specialty = "", clinic = "" }) => {
        if (page && pageSize) {
          const queryStrings = new URLSearchParams({
            page,
            pageSize,
            search,
            specialty,
            clinic,
          });
          return {
            url: `/doctors/by-customer?${queryStrings}`,
            method: "GET",
          };
        }
        return {
          url: `/doctors/by-customer`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getDoctorDetail: builder.query({
      query: ({ slug }) => {
        return {
          url: `/doctors/${slug}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetStatisticalDoctorQuery,
  useGetAllReviewsQuery,
  useGetDoctorsByCustomerQuery,
  useGetDoctorDetailQuery,
} = doctorApi;
