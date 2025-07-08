import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { type User, type UserState } from "../types/types"; // Ensure User type is imported
import { axiosInstance } from "../config/axios.config";
import { apipaths } from "../config/apiPath";
import { TOKEN } from "../constants/global.constants";

export const registerUser = createAsyncThunk(
  "users/register",
  async (user: User) => {
    try {
      const response = await axiosInstance.post(apipaths.auth.register(), user);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (user: Omit<User, "email">) => {
    try {
      const response = await axiosInstance.post(apipaths.auth.login(), user);
      if (response.status === 200) {
        const token = response.data.data.accessToken;
        localStorage.setItem(TOKEN, token);
        return response;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
);

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
