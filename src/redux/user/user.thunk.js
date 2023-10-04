import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "./user.api";

// Signup new user
export const signup = createAsyncThunk(
  "/signup",
  async (user, thunkAPI) => {
    try {
      return await userApi.signup(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    return await userApi.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//Logout user
export const logout = createAsyncThunk("/logout", async (_, thunkAPI) => {
  // const accessToken = thunkAPI.getState().user.user.accessToken;
  try {
    return await userApi.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
