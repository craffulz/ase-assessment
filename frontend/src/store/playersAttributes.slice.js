import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateToken } from "./user.slice.js";

import { API_URL } from "../config/config.js";
const URL = API_URL;
export const fetchAttributes = createAsyncThunk(
  "dashboard/fetchAttributes",
  async ({ accessToken }, { dispatch }) => {
    try {
      const response = await fetch(`${URL}/api/playerAttributes`, {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response) throw new Error("Error fetching attributes");

      //cambiar esto a user slice
      const newAcc = response.headers.get("Authorization");
      if (newAcc) {
        dispatch(updateToken(newAcc));
      }

      const playersAttributes = await response.json();

      return playersAttributes;
    } catch (error) {
      console.log(error);
    }
  }
);

const playersAttributesSlice = createSlice({
  name: "playersAttributes",

  initialState: {
    playersAttributes: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPlayerAttributes: async (state, action) => {
      const { playerId } = action.payload;
      const { playersAttributes } = action.payload;

      state.playersAttributes.playerId = playerId;
      state.playersAttributes = {
        ...state.playersAttributes,
        ...playersAttributes,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.playersAttributes = action.payload.playersAttributes;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPlayerAttributes } = playersAttributesSlice.actions;
export default playersAttributesSlice.reducer;
