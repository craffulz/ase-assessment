//import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import Router from "./components/Router.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import GlobalModals from "./components/modals/GlobalModals.jsx";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
      <GlobalModals />
    </Provider>
  </StrictMode>
);
