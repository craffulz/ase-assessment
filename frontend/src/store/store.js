import userReducer from "./user.slice.js";
import playerReducer from "./players.slice.js";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    user: userReducer,
    players: playerReducer,
  },
});
