import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import DeviceFrame from "./components/DeviceFrame/DeviceFrame.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./user/UserContext.jsx";
import { VideoDataProvider } from "./context/VideoDataContext.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
import { DeezerDataProvider } from "./context/DeezerDataContext.jsx";

// Im iframe (?embedded) rendern wir die reine App, sonst den iPhone-12-Rahmen.
// Der window.top-Check greift, wenn im iframe neu geladen wird und dabei der
// Query-Parameter verloren geht.
const isEmbedded =
  new URLSearchParams(window.location.search).has("embedded") ||
  window.self !== window.top;

const app = (
  <BrowserRouter>
    <UserDataProvider>
      <UserProvider>
        <VideoDataProvider>
          <DeezerDataProvider>
            <App />
          </DeezerDataProvider>
        </VideoDataProvider>
      </UserProvider>
    </UserDataProvider>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isEmbedded ? app : <DeviceFrame>{app}</DeviceFrame>}
  </React.StrictMode>
);
