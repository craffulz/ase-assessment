import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const retrieveToken = (bearer) => {
  const access_token = bearer.split(" ")[1];
  return access_token;
};

const initializeData = () => {
  console.log("typeof sessionStorage:", typeof sessionStorage);
  console.log("typeof sessionStorage.getItem:", typeof sessionStorage.getItem);

  const bearer = sessionStorage.getItem("access_token");
  console.log("BEARER:", bearer);
  console.log("BEARER TYPE:", typeof bearer);

  if (!bearer || bearer === "undefined") {
    console.log("No bearer found");
    return { email: "", accessToken: "", connected: false };
  }

  try {
    const accessToken = retrieveToken(bearer);
    console.log("Token retrieved se supone? ", accessToken);
    sessionStorage.setItem("access_token", accessToken);
    const { email } = jwtDecode(accessToken);
    return { email: email, accessToken: accessToken, connected: true };
  } catch (error) {
    console.log("Error decoding: ", error);
    return { email: "", accessToken: "", connected: false };
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
      const bearer = action.payload;
      const accessToken = retrieveToken(bearer);
      const { email } = jwtDecode(accessToken);
      state.email = email;
      state.accessToken = accessToken;
      state.connected = true;
      sessionStorage.setItem("access_token", accessToken);
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
