import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateToken } from "./user.slice.js";
export const fetchAttributes = createAsyncThunk(
  "dashboard/fetchAttributes",
  async ({ accessToken }, { dispatch }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/players/`, {
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

      const playerAttributes = await response.json();

      return playerAttributes;
    } catch (error) {
      console.log(error);
    }
  }
);

const playersAttributesSlice = createSlice({
  name: "playersAttributes",

  initialState: {
    playerAttributes: {
      playerId: "",
      pace: "",
      shooting: "",
      passing: "",
      defending: "",
      dribbling: "",
      physicality: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    setPlayerAttributes: async (state, action) => {
      const { playerId } = action.payload;
      const { playerAttributes } = action.payload;

      state.playerAttributes.playerId = playerId;
      state.playerAttributes = {
        ...state.playerAttributes,
        ...playerAttributes,
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
        state.playerAttributes = action.payload.playerAttributes;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPlayerAttributes } = playersAttributesSlice.actions;
export default playersAttributesSlice.reducer;
