import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { RootState } from "../store";

export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  token: string;
}

interface AuthState {
  data: UserData | null;
  status: "loading" | "loaded" | "error";
}

const initialState: AuthState = {
  data: null,
  status: "loading",
};

export const fetchAuth = createAsyncThunk<
  UserData,
  { email: string; password: string }
>("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk<
  UserData,
  { fullName: string; email: string; password: string }
>("auth/fetchRegister", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk<UserData>(
  "auth/fetchAuthMe",
  async () => {
    const { data } = await axios.get("/auth/me");
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(
        fetchAuth.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = "loaded";
          state.data = action.payload;
        }
      )
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })

      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(
        fetchRegister.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = "loaded";
          state.data = action.payload;
        }
      )
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(
        fetchAuthMe.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = "loaded";
          state.data = action.payload;
        }
      )
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state: RootState): boolean =>
  Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
