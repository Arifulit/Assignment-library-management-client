import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../api/bookApi';

interface BookState {
  selectedBook: Book | null;
  searchTerm: string;
}

const initialState: BookState = {
  selectedBook: null,
  searchTerm: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSelectedBook(state, action: PayloadAction<Book>) {
      state.selectedBook = action.payload;
    },
    clearSelectedBook(state) {
      state.selectedBook = null;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSelectedBook, clearSelectedBook, setSearchTerm } = bookSlice.actions;
export default bookSlice.reducer;
