import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/dataBase";

const normalizeCategory = (category) => category.toLowerCase().replace(/\s+/g, '-');

export const shopApi = createApi({
    reducerPath: "shopApi", 
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories.json',
        }),
        getEvents: builder.query({
            query: () => 'events.json',
        }),
        getEventsByCategory: builder.query({
            query: (category) => {
                const categoryNormalized = normalizeCategory(category); 
                return `events.json?orderBy="category"&equalTo="${categoryNormalized}"`;
            },
            transformResponse: (response) => (
                response ? Object.values(response) : []
            ),
        }),
        getEvent: builder.query({
            query: (eventId) => `events.json?orderBy="id"&equalTo=${eventId}`,
            transformResponse: (response) => (
                response ? Object.values(response)[0] : null
            ),
        }),
    }),
});

export const { useGetCategoriesQuery, useGetEventsQuery, useGetEventsByCategoryQuery, useGetEventQuery } = shopApi;
