/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";

const api = new ApiService();

//  async thunk for login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    try {
      const loginResp = await api.postWithOutToken("/auth/login", credentials);
      toast.success("Successfully logged in");

      return loginResp;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

//  async thunk for logout
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    console.log("");
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});

//  async thunk for register
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    try {
      const loginResp = await api.postWithOutToken(
        "/auth/register",
        credentials
      );
      toast.success("Successfully Registered");
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

// async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async () => {
    try {
      const userData = await api.getWithToken("/getProfile");
      return userData.user;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
