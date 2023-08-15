import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./user/UserContext.jsx";
import { VideoDataProvider } from "./context/VideoDataContext.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <VideoDataProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </VideoDataProvider>
      </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
