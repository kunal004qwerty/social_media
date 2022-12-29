import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

// !----------REDUX
import { Provider } from "react-redux";
import store from "./Store/ReduxStorage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
