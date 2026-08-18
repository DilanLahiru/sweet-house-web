import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, API_PATH } from "../utils/baseUrl";

// Load all products
export const loadAllProducts = createAsyncThunk(
  "product/loadAll",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}${API_PATH.PRODUCT.LOAD_ALL}`);
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new product
export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}${API_PATH.PRODUCT.CREATE}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(loadAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    builder
        .addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        });
  }
});

export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;