import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const setToken = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = "";
};

export const apiRegisterUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const { data } = await authInstance.post("/users/signup", userData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  "auth/logins",
  async (userData, thunkApi) => {
    try {
      const { data } = await authInstance.post("/users/login", userData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiGetCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("No token provided to refresh user data");
    }

    try {
      setToken(token);
      const { data } = await authInstance.get("/users/current");

      console.log("data: ", data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const { data } = await authInstance.post("/users/logout");

      clearToken();
      console.log("data: ", data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
