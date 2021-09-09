import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./components/App";
import { configStore } from "./store/index";
import { Provider } from "react-redux";

const store = configStore();
console.log("initial state ", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
