import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@axios/axios";

export const clinicApi = createApi({
  reducerPath: "clinicApi",
  baseQuery: async (args, api, extraOptions) => {
    const { url, method, data, params } = args;
    return baseQuery({ url, method, data, params });
  },
  endpoints: (builder) => ({
    getClinicDetailByAdmin: builder.query({
      query: () => ({
        url: "/admin/clinics/detail",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetClinicDetailByAdminQuery } = clinicApi;
