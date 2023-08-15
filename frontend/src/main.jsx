import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./user/UserContext.jsx";
import { GeneratePexelDataProvider } from "./context/GeneratePexelDataContext.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <GeneratePexelDataProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </GeneratePexelDataProvider>
      </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
