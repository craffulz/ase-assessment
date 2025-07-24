import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const retrieveToken = (bearer) => {
  const access_token = bearer.split(" ")[1];
  return access_token;
};

const isValidToken = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.log("[Error validating accessToken]", error);
    return false;
  }
};
const initializeData = () => {
  //console.log("typeof sessionStorage:", typeof sessionStorage);
  //console.log("typeof sessionStorage.getItem:", typeof sessionStorage.getItem);

  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken || !isValidToken(accessToken)) {
    console.log("[STORE] Initializing data... \n No accesstoken found");
    sessionStorage.removeItem("accessToken");
    return { email: "", accessToken: "", connected: false };
  }

  try {
    //console.log("[STORE] Initializing data... \n Took token ", accessToken);
    const { email } = jwtDecode(accessToken);
    return { email: email, accessToken: accessToken, connected: true };
  } catch (error) {
    console.log("Error decoding: ", error);
    return { email: "", accessToken: null, connected: false };
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
      console.log("[STORE] Store loging user...\n");

      const bearer = action.payload;
      const accessToken = retrieveToken(bearer);

      if (!isValidToken(accessToken)) {
        console.log("Invalid token during login");
        return;
      }

      console.log("[STORE] Access token retrieved: \n", accessToken);

      const { email } = jwtDecode(accessToken);
      state.email = email;
      state.accessToken = accessToken;
      state.connected = true;

      sessionStorage.setItem("accessToken", accessToken);
    },

    logout: (state) => {
      state.email = "";
      state.accessToken = "";
      state.connected = false;
      sessionStorage.removeItem("accessToken");
      
    },
    updateToken: (state, action) => {
      const bearer = action.payload;
      const accessToken = retrieveToken(bearer);

      try {
        const { email } = jwtDecode(accessToken);
        state.email = email;
        state.accessToken = accessToken;
        sessionStorage.setItem("accessToken", accessToken);
      } catch (error) {
        console.log("[STORE] Error updating token, invalid: ", error);
      }
    },
  },
});

export const { login, logout, updateToken } = userSlice.actions;

export default userSlice.reducer;
