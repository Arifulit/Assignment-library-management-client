import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api/apiSlice";
import "./features/bookApi"; 
import bookReducer from "./features/bookSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    book: bookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;