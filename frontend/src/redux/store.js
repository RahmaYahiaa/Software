import { configureStore } from "@reduxjs/toolkit";
import handleCart from "./reducer/handleCart";

export const store = configureStore({
  reducer: {
    handleCart,
  },
});