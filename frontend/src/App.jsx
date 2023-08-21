import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import CategoryMeditate from "./pages/CategoryMeditate/CategoryMeditate";
import DetailsYoga from "./pages/DetailsYoga/DetailsYoga";
import DetailsMediatation from "./pages/DetailsMeditation/DetailsMediatation";
import MeditationPlayer from "./pages/MeditationPlayer/MeditationPlayer";
import Music from "./pages/Music/Music";
import Signin from "./user/Signin";
import DetailsMusic from "./pages/DetailsMusic/DetailsMusic";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category/yoga/" element={<CategoryYoga />} />
        <Route path="/category/yoga/:id" element={<DetailsYoga />} />
        <Route path="/category/meditation/" element={<CategoryMeditate />} />
        <Route
          path="/category/meditation/:id"
          element={<DetailsMediatation />}
        />
        <Route path="/meditationplayer/:id" element={<MeditationPlayer />} />
        <Route path="/music/" element={<Music />} />
        <Route path="/music/:id" element={<DetailsMusic />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/passwordReset" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
