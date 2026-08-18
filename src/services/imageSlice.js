import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, API_PATH } from "../utils/baseUrl";

// Async thunk for uploading an image
export const uploadImage = createAsyncThunk(
  "image/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}${API_PATH.IMAGE.UPLOAD}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  images: [],
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { setImages } = imageSlice.actions;

export default imageSlice.reducer;