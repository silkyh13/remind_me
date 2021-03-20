import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//this is what actually pass redux store to child components
import { Provider } from "react-redux";
import store from "./state";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
