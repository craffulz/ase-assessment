import { createSlice } from "@reduxjs/toolkit";

const playerViewSlice = createSlice({
  name: "playerView",

  initialState: {
    player: {
      id: "",
      name: "",
      position: "",
      age: "",
      tema: "",
      nationality: "",
      height: "",
      goals: "",
      assists: "",
      appearances: "",
      contract_salary: "",
      contract_end: "",
      market_value: "",
      created_at: "",
    },

    playerView: false,

    playerForm: false,
    attributesForm: false,
    reportForm: false,

    modalAttributes: false,

    sureAboutDelete: false,
    sureAboutAdd: false,
  },

  reducers: {
    closeReportForm: (state) => {
      state.reportForm = true;
    },
    setReportForm: (state) => {
      state.reportForm = true;
    },
    closeAttributesForm: (state) => {
      state.sureAboutAdd = false;
    },
    setAttributesForm: (state) => {
      state.attributesForm = true;
    },
    closePlayerForm: (state) => {
      state.playerForm = false;
    },
    setPlayerForm: (state) => {
      state.playerForm = true;
    },
    setPlayerView: (state, action) => {
      const player = action.payload;
      state.player = player;
      state.playerView = true;
    },
    closePlayerView: (state) => {
      state.playerView = false;
    },
    setSureAboutDelete: (state) => {
      state.sureAboutDelete = !state.sureAboutDelete;
    },
    setSureAboutAdd: (state) => {
      state.sureAboutAdd = !state.sureAboutAdd;
    },
  },
});

export const {
  setPlayer,
  setReportForm,
  closeReportForm,
  setPlayerForm,
  closePlayerForm,
  setAttributesForm,
  closeAttributesForm,
  setPlayerView,
  closePlayerView,
  setSureAboutDelete,
} = playerViewSlice.actions;
export default playerViewSlice.reducer;
