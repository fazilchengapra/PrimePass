import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { appRouter } from "./App";
import reportWebVitals from "./reportWebVitals";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <RouterProvider router={appRouter} />
      </Theme>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
