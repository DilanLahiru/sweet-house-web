import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../services/gallerySlice";
import posterReducer from "../services/posterSlice";
import reviewReducer from "../services/reviewSlice";
import productReducer from "../services/productSlice";
import userReducer from "../services/userSlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    poster: posterReducer,
    review: reviewReducer,
    product: productReducer,
    user: userReducer,
  },
});