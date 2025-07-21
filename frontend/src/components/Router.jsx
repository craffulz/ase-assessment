import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signin from "../pages/Signin.jsx";
import Players from "../pages/Players.jsx";
import Dashboard from "../pages/Dashboard.jsx";

export const router = createBrowserRouter([
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/players", element: <Players /> },
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signin /> },
]);

export default router;
