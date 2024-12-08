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
    getClinicsByCustomer: builder.query({
      query: ({ page, pageSize, search = "", specialty = "" }) => {
        if (page && pageSize) {
          const queryStrings = new URLSearchParams({
            page,
            pageSize,
            search,
            specialty,
          });
          return {
            url: `/clinics/by-customer?${queryStrings}`,
            method: "GET",
          };
        }
        return {
          url: `/clinics/by-customer`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getClinicDetailBySlug: builder.query({
      query: ({ slug }) => ({
        url: `/clinics/${slug}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetClinicDetailByAdminQuery,
  useGetClinicsByCustomerQuery,
  useGetClinicDetailBySlugQuery,
} = clinicApi;
