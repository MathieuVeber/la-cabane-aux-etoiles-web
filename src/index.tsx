import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { store, RootState } from "./store";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { fetchConnectedParent } from "./Auth/actions";

(store.dispatch as ThunkDispatch<RootState, void, Action>)(
  fetchConnectedParent()
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
