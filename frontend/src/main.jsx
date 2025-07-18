import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {  RouterProvider } from "react-router";
import "./index.css";
import Router from "./components/Router.jsx";
import { Provider } from "react-redux";
import store from './store/store.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store ={store}>
      <RouterProvider router={Router} />
    </Provider>
  </StrictMode>
);
