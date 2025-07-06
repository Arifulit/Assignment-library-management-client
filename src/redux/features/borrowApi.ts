
import { api } from "../../redux/api/apiSlice";

export interface Borrow {
  _id: string;
  book: {
    _id: string;
    title: string;
    isbn?: string;
  };
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowSummary {
  title: string;
  isbn: string;
  totalBorrowed: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const borrowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      ApiResponse<Borrow>,
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrow`,
        method: "POST",
        body: { book: bookId, quantity, dueDate },
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),

    getBorrowSummary: builder.query<ApiResponse<BorrowSummary[]>, void>({
      query: () => `/borrow`,
      providesTags: ["Books", "Borrow"],
    }),

    getBorrowById: builder.query<ApiResponse<Borrow>, string>({
      query: (borrowId) => `/borrow/${borrowId}`, // ✅ Corrected
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
  useGetBorrowByIdQuery,
} = borrowApi;
