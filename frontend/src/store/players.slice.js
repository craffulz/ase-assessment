import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateToken } from "./user.slice.js";

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (accessToken, { dispatch }) => {
    try {
      const response = await fetch("http://localhost:3000/api/players", {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching players");
      }

      console.log(data);

      const newAcc = response.headers.get("Authorization");
      if (newAcc) {
        dispatch(updateToken(newAcc));
      }

      return data.players;
    } catch (error) {
      console.log(error);
    }
  }
);

const playerSlice = createSlice({
  name: "players",

  initialState: {
    players: [],
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default playerSlice.reducer;
