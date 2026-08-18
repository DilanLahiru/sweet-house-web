import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, API_PATH } from "../utils/baseUrl";


// Load all gallery images
export const loadAllGalleryImages = createAsyncThunk(
  "gallery/loadAll",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}${API_PATH.GALLERY.LOAD_ALL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  images: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(loadAllGalleryImages.fulfilled, (state, action) => {
            state.images = action.payload;
        });
  }
});

export const selectGalleryImages = (state) => state.gallery.images;

export default gallerySlice.reducer;