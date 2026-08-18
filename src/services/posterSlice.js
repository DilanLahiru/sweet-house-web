import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, API_PATH } from "../utils/baseUrl";


// Load all posters
export const loadAllPosters = createAsyncThunk(
  "poster/loadAll",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}${API_PATH.POSTER.LOAD_ALL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new poster
export const createPoster = createAsyncThunk(
  "poster/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}${API_PATH.POSTER.CREATE}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posters: [],
};

const posterSlice = createSlice({
  name: "poster",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(loadAllPosters.fulfilled, (state, action) => {
            state.posters = action.payload;
        });
  }
});

export const selectPosters = (state) => state.poster.posters;

export default posterSlice.reducer;