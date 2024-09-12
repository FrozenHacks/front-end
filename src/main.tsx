import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import CustomRouter from "./routing/CustomRouter.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="137804659888-lt5dumr7troba77d53mvlr00a7j5aidd.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={CustomRouter} />
        <Toaster />
      </Provider>
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
