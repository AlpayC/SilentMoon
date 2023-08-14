import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "./user/UserContext";

// Routes
import Home from "./pages/Home/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile/Profile";

import "./App.css";
import ResetPassword from "./user/ResetPassword";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Reminder from "./pages/Reminder/Reminder";
import CategoryYoga from "./pages/CategoryYoga/CategoryYoga";
import DetailsYoga from "./pages/DetailsYoga/DetailsYoga";
import DetailsMediatation from "./pages/DetailsMeditation/DetailsMediatation";
import MeditationPlayer from "./pages/MeditationPlayer/MeditationPlayer";
import MusicPlayList from "./pages/MusicPlayList/MusicPlayList";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <>
      <nav>
        <a href="/">Home</a>
        {!isLoggedIn && (
          <>
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
          </>
        )}
        {isLoggedIn && (
          <>
            <a href="/profile">Profile</a>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/category/yoga/" element={<CategoryYoga />} />
          <Route path="/category/yoga/:id" element={<DetailsYoga />} />
          <Route path="/category/meditation/" element={<CategoryMeditate />} />
          <Route
            path="/category/meditation/:id"
            element={<DetailsMediatation />}
          />
          <Route path="/meditationplayer" element={<MeditationPlayer />} />
          <Route path="/musicplaylist" element={<MusicPlayList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
