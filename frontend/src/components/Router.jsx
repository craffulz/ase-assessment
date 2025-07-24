import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signin from "../pages/Signin.jsx";
import Players from "../pages/Players.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import Tries from "../pages/Tries.jsx";
import NewPlayer from "../pages/NewPlayer.jsx";
import NewReport from "../pages/NewReport.jsx";

export const router = createBrowserRouter([
  { path: "/newPlayer", element: <NewPlayer /> },
  { path: "/newReport", element: <NewReport /> },
  { path: "/tries", element: <Tries /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/players", element: <Players /> },
  { path: "/", element: <Login /> },
  { path: "/register", element: <Signin /> },
  { path: "/home", element: <Home /> },
]);

export default router;
