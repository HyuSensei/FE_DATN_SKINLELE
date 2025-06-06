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
    getAllReviewsByDoctor: builder.query({
      query: ({ page = 1, pageSize = 10, rate = "", search = "", doctor }) => {
        const queryStrings = new URLSearchParams({
          page,
          pageSize,
          rate,
          search,
        }).toString();
        return {
          url: `/doctors/reviews/${doctor}?${queryStrings}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getDoctorsByCustomer: builder.query({
      query: ({
        page,
        pageSize,
        specialty = "",
        experience = "",
        priceRange = "",
        rating = "",
        clinic = "",
        search = "",
      }) => {
        if (page && pageSize) {
          const queryStrings = new URLSearchParams({
            page,
            pageSize,
            search,
            specialty,
            clinic,
            experience,
            priceRange,
            rating,
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
    getScheduleBookingDoctor: builder.query({
      query: ({ date = "", doctorId }) => {
        return {
          url: `/doctors/schedule-booking/${doctorId}?date=${date}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getAllReviewsByCustomer: builder.query({
      query: ({ page = 1, pageSize = 10, rate = "", doctor }) => {
        const queryStrings = new URLSearchParams({
          page,
          pageSize,
          rate,
        }).toString();
        return {
          url: `/doctors/reviews/by-customer/${doctor}?${queryStrings}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getFilterOptionsDoctor: builder.query({
      query: () => ({
        url: `/doctors/filter-options`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getDoctorClinicBySearch: builder.query({
      query: ({ search }) => ({
        url: `/doctors/search-doctor-clinic?search=${search}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getDoctorRecommend: builder.query({
      query: ({ page = 1, pageSize = 5, categories = "" }) => {
        const queryStrings = new URLSearchParams({
          page,
          pageSize,
          categories,
        }).toString();
        return {
          url: `/doctors/doctor-recommend/?${queryStrings}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetStatisticalDoctorQuery,
  useGetAllReviewsByDoctorQuery,
  useGetDoctorsByCustomerQuery,
  useGetDoctorDetailQuery,
  useGetScheduleBookingDoctorQuery,
  useGetAllReviewsByCustomerQuery,
  useGetFilterOptionsDoctorQuery,
  useGetDoctorClinicBySearchQuery,
  useGetDoctorRecommendQuery,
} = doctorApi;
