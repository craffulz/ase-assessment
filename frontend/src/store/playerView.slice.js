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
    attributesAsk: false,

    sureAboutDelete: false,
    sureAboutAdd: false,
  },

  reducers: {
    setAttributesAsk: (state) => {
      state.attributesAsk = true;
    },
    closeAttributesAsk: (state) => {
      state.attributesAsk = false;
    },
    closeReportForm: (state) => {
      state.reportForm = false;
    },
    setReportForm: (state) => {
      state.reportForm = true;
    },
    closeAttributesForm: (state) => {
      state.attributesForm = false;
    },
    setAttributesForm: (state) => {
      state.attributesForm = true;
    },
    closePlayerForm: (state) => {
      console.log("player form faalso");
      state.playerForm = false;
    },
    setPlayerForm: (state) => {
      console.log("Player form TRUe");
      state.playerForm = true;
    },
    setPlayerView: (state, action) => {
      const player = action.payload;
      state.player = player;
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
  setAttributesAsk,
  closeAttributesAsk,
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
