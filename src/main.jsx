import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
