import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initializeData = () => {
  const accessToken = sessionStorage.getItem("access_token");
  if (!accessToken) {
    return { email: "", accessToken: "", connected: false };
  }
  try {
    const { email } = jwtDecode(accessToken);
    return { email: email, accessToken: accessToken, connected: true };
  } catch (error) {
    console.log("Error decoding: ", error);
    sessionStorage.removeItem("access_token");
  }
};

const userSlice = createSlice({
  name: "user",

  initialState: initializeData(),

  reducers: {
    disconnect: (state) => {
      state.connected = false;
    },
    login: (state, action) => {
      const accessToken = action.payload;
      const { email } = jwtDecode(accessToken);
      state.email = email;
      state.accessToken = accessToken;
      state.connected = true;
    },
    logout: (state) => {
      state.email = "";
      state.accessToken = "";
      state.connected = false;
      sessionStorage.removeItem("access_token");
    },
    updateToken: (state, action) => {
      const accessToken = action.payload;

      try {
        const { email } = jwtDecode(accessToken);
        state.email = email;
        state.accessToken = accessToken;
        sessionStorage.setItem("access_token", accessToken);
      } catch (error) {
        console.log("Error updating token, invalid: ", error);
      }
    },
  },
});

export const { login, logout, updateToken } = userSlice.actions;

export default userSlice.reducer;
