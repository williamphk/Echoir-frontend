import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, thunkAPI) => {
    //console.log(data);
    try {
      const response = await api.post("/users", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    //console.log(data);
    try {
      const response = await api.post("/login", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (data, thunkAPI) => {
    //console.log(data);
    try {
      const response = await api.get("/login/check", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    status: null,
    user: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      //console.log("login");
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = "succeeded";
    },
    logout: (state) => {
      //console.log("logout");
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      // Handle the registration success case
      state.status = "succeeded";
      // Update the state with the received user data
      state.token = action.payload.token;
      state.user = action.payload.userResponse;
      state.error = null;
      // Store the token in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.userResponse));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      // Handle the login error case
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      // Handle the registration success case
      state.status = "succeeded";
      // Update the state with the received user data
      state.token = action.payload.token;
      state.user = action.payload.userResponse;
      state.error = null;
      // Store the token & user in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.userResponse));
    });
    builder.addCase(signUp.rejected, (state, action) => {
      // Handle the registration error case
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      // Handle the registration success case
      state.status = "succeeded";
      // Update the state with the received user data
      state.token = action.payload.token;
      state.user = action.payload.userResponse;
      state.error = null;
      // Store the token & user in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.userResponse));
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
