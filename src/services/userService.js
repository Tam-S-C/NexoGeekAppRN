import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({

  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    
    putProfilePicture: builder.mutation({
      query: ({ image,localId }) => ({
        url: `profilePictures/${localId}.json`,
        method: "PUT",
        body: {
            image:image
        }
      }),
    }),
    getProfilePicture: builder.query({
        query: (localId) => `profilePictures/${localId}.json`
    }),


    putNickName: builder.mutation({
      query: ({ localId, nickName }) => ({
        url: `nick/${localId}.json`,
        method: "PUT",
        body: { nickName },
      }),
    }),
    getNickName: builder.query({
      query: (localId) => `nick/${localId}.json?fields=nickName`,
    }),

    putEdad: builder.mutation({
      query: ({ localId, edad }) => ({
        url: `edad/${localId}.json`,
        method: "PUT",
        body: { edad },
      }),
    }),
    getEdad: builder.query({
      query: (localId) => `edad/${localId}.json?fields=edad`,
    }),

    putCiudad: builder.mutation({
      query: ({ localId, ciudad }) => ({
        url: `city/${localId}.json`,
        method: "PUT",
        body: { ciudad },
      }),
    }),
    getCiudad: builder.query({
      query: (localId) => `city/${localId}.json?fields=ciudad`,
    }),
  }),
});

export const { usePutProfilePictureMutation,
  useGetProfilePictureQuery,
  usePutNickNameMutation,
  useGetNickNameQuery,
  usePutEdadMutation,
  useGetEdadQuery,
  usePutCiudadMutation,
  useGetCiudadQuery,
} = userApi;