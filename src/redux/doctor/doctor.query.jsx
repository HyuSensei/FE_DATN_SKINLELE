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
  }),
});

export const { useGetStatisticalDoctorQuery } = doctorApi;
