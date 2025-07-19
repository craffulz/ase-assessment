import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateToken } from "./user.slice.js";

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async ({ accessToken, page = 1, filters = {} }, { dispatch }) => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 20,
        ...filters,
      });

      const response = await fetch(
        `http://localhost:3000/api/players?${params}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching players");
      }

      console.log(data);

      const newAcc = response.headers.get("Authorization");
      if (newAcc) {
        dispatch(updateToken(newAcc));
      }

      return { players: data.players, pagination: data.pagination };
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
    pagination: { 
        currentPage: 1,
        totalPages: 1, 
        totalItems: 0
    },

    //nos falta aniadir todos los filtros, que seran todos los campos?
    filters: {
        position: '', 
        team: '',
        minAge: '',
        maxAge: '',
    }
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
