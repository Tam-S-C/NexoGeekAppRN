import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/dataBase";

export const orderApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: ({...order})=>({
                url: 'orders.json',
                method: 'POST',
                body: order,
            }),
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
          }),
        }),
      });

export const { usePostOrderMutation, useGetOrdersQuery } = orderApi