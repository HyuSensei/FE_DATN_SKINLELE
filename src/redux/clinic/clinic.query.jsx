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
      query: ({
        page,
        pageSize,
        specialties = "",
        priceRange = "",
        doctorCount = "",
        rating = "",
        workingHours = "",
        search = "",
      }) => {
        if (page && pageSize) {
          const queryStrings = new URLSearchParams({
            page,
            pageSize,
            search,
            specialties,
            priceRange,
            doctorCount,
            rating,
            workingHours,
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
    getReviewsClinic: builder.query({
      query: ({
        page,
        pageSize,
        clinicId,
        sortBy = "createdAt",
        sortOrder = "desc",
        rating = "",
      }) => {
        const queryStrings = new URLSearchParams({
          page,
          pageSize,
          clinicId,
          sortBy,
          sortOrder,
          rating,
        });
        return {
          url: `/clinics/reviews?${queryStrings}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
    getFilterOptionsClinic: builder.query({
      query: () => ({
        url: `/clinics/filter-options`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getReviewsByClinic: builder.query({
      query: ({
        page,
        pageSize,
        clinicId,
        sortBy = "createdAt",
        sortOrder = "desc",
        rating = "",
        search = "",
      }) => {
        const queryStrings = new URLSearchParams({
          page,
          pageSize,
          clinicId,
          sortBy,
          sortOrder,
          rating,
          search,
        });
        return {
          url: `/admin/clinics/reviews?${queryStrings}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetClinicDetailByAdminQuery,
  useGetClinicsByCustomerQuery,
  useGetClinicDetailBySlugQuery,
  useGetReviewsClinicQuery,
  useGetFilterOptionsClinicQuery,
  useGetReviewsByClinicQuery
} = clinicApi;
