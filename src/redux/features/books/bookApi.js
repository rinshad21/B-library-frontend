import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseurl from "./../../../utils/getBaseurl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseurl()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const booksApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    addbook: builder.mutation({
    query: (newBook) => ({
        url: `/create-book`,
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"], //the book will prefetch to included to api
    }),
    updatebook: builder.mutation({
      query: ({ id, ...rest }) => ({
        //query will include id and rest of body to update
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});
export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddbookMutation,
  useUpdatebookMutation,
  useDeleteBookMutation,
} = booksApi;
export default booksApi;
