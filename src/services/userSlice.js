import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, API_PATH } from "../utils/baseUrl";

// Create a new user
export const createUser = createAsyncThunk(
  "user/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}${API_PATH.USER.CREATE}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login a user
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}${API_PATH.USER.LOGIN}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a user
export const updateUser = createAsyncThunk(
  "user/update",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}${API_PATH.USER.UPDATE}/${formData._id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Change user password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}${API_PATH.USER.CHANGE_PASSWORD}/${formData._id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(createUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        });
  }
});

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;