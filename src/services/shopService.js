import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories.json",
    }),

    getEvents: builder.query({
      query: () => "events.json",
    }),

    getEventsByCategory: builder.query({
      query: (category) => {
        const encodedURL = `events.json?orderBy="category"&equalTo="${category}"`;
        return encodedURL;
      },
      transformResponse: (response) =>
        response ? Object.values(response) : [],
    }),

    getEvent: builder.query({
      query: (eventId) => `events.json?orderBy="id"&equalTo=${eventId}`,
      transformResponse: (response) =>
        response ? Object.values(response)[0] : null,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetEventsQuery,
  useGetEventsByCategoryQuery,
  useGetEventQuery,
} = shopApi;
