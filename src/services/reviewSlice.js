import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, API_PATH } from "../utils/baseUrl";


// Load all reviews
export const loadAllReviews = createAsyncThunk(
  "review/loadAll",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}${API_PATH.REVIEW.LOAD_ALL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new review
export const createReview = createAsyncThunk(
  "review/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}${API_PATH.REVIEW.CREATE}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(loadAllReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
        });
    builder
        .addCase(createReview.fulfilled, (state, action) => {
            state.reviews.push(action.payload);
        });
  }
});

export const selectReviews = (state) => state.review.reviews;

export default reviewSlice.reducer;