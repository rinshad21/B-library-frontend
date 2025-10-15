import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import booksApi from "./features/books/bookApi";
import orderApi from "./features/order/ordersApi";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, orderApi.middleware),
});
