import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@axios/axios";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: async (args, api, extraOptions) => {
    const { url, method, data, params } = args;
    return baseQuery({ url, method, data, params });
  },
  endpoints: (builder) => ({
    getBookingsByDoctor: builder.query({
      query: ({
        search = "",
        status = "",
        fromDate = "",
        toDate = "",
        page = 1,
        pageSize = 10,
      }) => {
        const queryParams = new URLSearchParams({
          search,
          status,
          fromDate,
          toDate,
          page,
          pageSize,
        }).toString();
        return {
          url: `/bookings/by-doctor?${queryParams}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getBookingsByCustomer: builder.query({
      query: ({ status = "", page = 1, pageSize = 10 }) => {
        const queryParams = new URLSearchParams({
          status,
          page,
          pageSize,
        }).toString();
        return {
          url: `/bookings/customer?${queryParams}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetBookingsByDoctorQuery , useGetBookingsByCustomerQuery} = bookingApi;
