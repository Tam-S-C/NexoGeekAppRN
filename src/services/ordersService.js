import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/dataBase";

export const orderApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: ({...order})=>({
                url: 'orders.json',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ["Orders"],
        }),
        getOrders: builder.query({
            query: () => 'orders.json',
            transformResponse: (response) => {
              if (!response) return [];
              return Object.keys(response).map((key) => ({
                id: key,
                ...response[key],
              }));
            },
            providesTags: ["Orders"],
          }),
        }),
      });

export const { usePostOrderMutation, useGetOrdersQuery } = orderApi