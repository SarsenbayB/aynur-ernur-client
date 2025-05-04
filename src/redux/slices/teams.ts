import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
  createdAt: string;
}

interface TeamState {
  team: {
    items: TeamMember[];
    status: "loading" | "loaded" | "error";
  };
}

const initialState: TeamState = {
  team: {
    items: [],
    status: "loading",
  },
};

export const fetchTeam = createAsyncThunk<TeamMember[]>(
  "team/fetchTeam",
  async () => {
    const { data } = await axios.get("/team");
    return data;
  }
);

export const fetchRemoveTeam = createAsyncThunk<string, string>(
  "team/fetchRemoveTeam",
  async (id) => {
    await axios.delete(`/team/${id}`);
    return id;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.team.items = [];
        state.team.status = "loading";
      })
      .addCase(
        fetchTeam.fulfilled,
        (state, action: PayloadAction<TeamMember[]>) => {
          state.team.items = action.payload;
          state.team.status = "loaded";
        }
      )
      .addCase(fetchTeam.rejected, (state) => {
        state.team.items = [];
        state.team.status = "error";
      })
      .addCase(fetchRemoveTeam.pending, (state, action) => {
        state.team.items = state.team.items.filter(
          (member) => member._id !== action.meta.arg
        );
      });
  },
});

export const teamReducer = teamSlice.reducer;
