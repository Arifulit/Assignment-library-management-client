import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
interface BorrowSummary {
  title: string;
  isbn: string;
  totalBorrowed: number;
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // Backend base URL
  }),
  tagTypes: ["Books", "Borrow"],

  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query<ApiResponse<Book[]>, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    // Get single book by ID
    getBook: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
    }), // Create new book
    createBook: builder.mutation<ApiResponse<Book>, BookFormData>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),

    // Update book
    updateBook: builder.mutation<ApiResponse<Book>, { id: string; book: Book }>(
      {
        query: ({ id, book }) => ({
          url: `/books/${id}`,
          method: "PUT",
          body: book,
        }),
        invalidatesTags: ["Books"],
      }
    ),

    // Delete book
    deleteBook: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),

    // Borrow a book
    borrowBook: builder.mutation({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrow`,
        method: "POST",
        body: { bookId, quantity, dueDate },
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),


    getBorrowSummary: builder.query<ApiResponse<BorrowSummary[]>, void>({
      query: () => "/borrow",
      providesTags: ["Books", "Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;
