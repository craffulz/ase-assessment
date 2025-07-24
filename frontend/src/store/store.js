import userReducer from "./user.slice.js";
import playerReducer from "./players.slice.js";
import playersAttributesReducer from "./playersAttributes.slice.js";
import playerViewReducer from "./playerView.slice.js";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    user: userReducer,
    players: playerReducer,
    playersAttributes: playersAttributesReducer,
    playerView: playerViewReducer,
  },
});
