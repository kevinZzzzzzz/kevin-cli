import React, { Suspense } from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.scss";
import store, { persister } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
