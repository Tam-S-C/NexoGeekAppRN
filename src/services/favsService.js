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
      query: (id) => ({
        url: `favs.json`,
        method: "GET",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response) {
            const keysToDelete = Object.entries(response)
              .filter(([_, value]) => value.id === id)
              .map(([key]) => key);


            await Promise.all(
              keysToDelete.map(key =>
                dispatch(
                  favsApi.endpoints.deleteByKey.initiate({ key })
                )
              )
            );
          }
        } catch (error) {
          console.error("Error removing favorite:", error);
          throw error; 
        }
      },
    }),


    deleteByKey: builder.mutation({
      query: ({ key }) => ({
        url: `favs/${key}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favs"],
    }),


    getFavs: builder.query({
      query: () => `favs.json`,
      transformResponse: (response) => {
        if (!response) return [];
         const favs = Object.entries(response).map(([key, value]) => ({
          firebaseKey: key,
          ...value,
        }));
        return favs.filter((fav, index) => 
          index === favs.findIndex(f => f.id === fav.id)
        );
      },
      providesTags: ["Favs"],
    }),
  }),
});


export const { 
  useAddFavMutation, 
  useGetFavsQuery, 
  useRemoveFavMutation,
  useDeleteByKeyMutation
 } =
  favsApi;
