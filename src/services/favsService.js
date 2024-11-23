import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favsApi = createApi({
  reducerPath: "favsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  tagTypes: ["Favs"],
  endpoints: (builder) => ({
    addFav: builder.mutation({
      query: (fav) => ({
        url: `favs.json`,
        method: "POST",
        body: fav,
      }),
      invalidatesTags: ["Favs"],
    }),

    removeFav: builder.mutation({
      query: (favId) => ({
        url: `favs/${favId}.json`, 
        method: "DELETE",
      }),
      invalidatesTags: ["Favs"],
    }),

    getFavs: builder.query({
      query: () => `favs.json`,
      transformResponse: (response) => {
        if (!response) return [];
        return Object.keys(response).map((key) => ({
          id: key,
          ...response[key],
        }));
      },
      providesTags: ["Favs"],
    }),
  }),
});

export const { useAddFavMutation, useGetFavsQuery, useRemoveFavMutation } = favsApi;
