import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseurl from "./../../../utils/getBaseurl";

const orderApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseurl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
    }),
    getOrderbyEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderbyEmailQuery } = orderApi;
export default orderApi;
