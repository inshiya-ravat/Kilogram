import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { type User, type UserState } from "../types/types"; // Ensure User type is imported
import { axiosInstance } from "../config/axios.config";
import { apipaths } from "../config/apiPath";
import { TOKEN } from "../constants/global.constants";
import type { AxiosResponse } from "axios";
export interface APIResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface LoggedinUserReponse {
  user: {
    _id: string;
    avatar: {
      url: string;
      localPath: string;
      _id: string;
    };
    username: string;
    email: string;
    role: string;
    loginType: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  accessToken: string;
  refreshToken: string;
}

export const registerUser = createAsyncThunk(
  "users/register",
  async (user: User) => {
    const response = await axiosInstance.post(apipaths.auth.register(), user);
    return response;
  }
);

export const loginUser = createAsyncThunk<
  AxiosResponse<APIResponse<LoggedinUserReponse>>,
  Omit<User, "email">
>("users/login", async (user) => {
  const response = await axiosInstance.post(apipaths.auth.login(), user);
  if (response.status === 200) {
    const token = response.data.data.accessToken;
    localStorage.setItem(TOKEN, token);
  }
  return response as AxiosResponse<APIResponse<LoggedinUserReponse>>;
});

const initialState: UserState = {
  entities: [],
  loading: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        console.error("Registration failed:", action.payload);
      });
  },
});

export const usersActions = usersSlice.actions;
export const store = configureStore({
  reducer: usersSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
