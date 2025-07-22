import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateToken } from "./user.slice.js";

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (
    { accessToken, page = 1, limit = 1, filters = {}, sort = {} },
    { dispatch }
  ) => {
    console.log(
      "acctok",
      accessToken,
      "[PlayerSlice] \npage: ",
      page,
      "\nlimit: ",
      limit,
      "\nfilters: ",
      filters,
      "\nsort: ",
      sort
    );

    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...filters,
        sortBy: sort.field,
        sortOrder: sort.direction,
      });

      const response = await fetch(
        `http://localhost:3000/api/players/search?${params}`,
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
        throw new Error("Error fetching players");
      }

      //console.log(data);

      //cambiar esto a user slice
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

const initialState = {
  players: [],
  loading: false,
  error: null,

  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  filters: {
    position: "",
    team: "",
    minAge: "",
    maxAge: "",
    nationality: "",
    marketValue: "",
    goals: "",
    assists: "",
    contract_end: "",
  },

  sort: {
    field: "name",
    direction: "asc",
  },
};

const playerSlice = createSlice({
  name: "players",

  initialState: initialState,

  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setSort: (state, action) => {
      console.log("[PlayersSlice] Setting sort...", action.payload);
      const field = action.payload;

      if (state.sort.field === field) {
        console.log("[PlayerSlice] This field was already sorted by...");
        state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
      } else {
        console.log("[PlayerSlice] New field to sort by...");
        state.sort.field = field;
        state.sort.direction = "asc";
      }

      console.log("[PlayersSlice] sort after being setted");
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sort = initialState.sort;
      state.pagination.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload.players;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setFilters, setSort, resetFilters } =
  playerSlice.actions;
export default playerSlice.reducer;
