/* eslint-disable @typescript-eslint/no-empty-object-type */

import { api } from "../../redux/api/apiSlice";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export interface BookFormData extends Omit<Book, "_id"> {}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<Book[]>, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBook: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation<ApiResponse<Book>, BookFormData>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<ApiResponse<Book>, { id: string; book: Book }>({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
