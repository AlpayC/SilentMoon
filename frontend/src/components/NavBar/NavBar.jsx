import "./NavBar.css";
import HomeImg from "../../assets/img/Nav/Home.svg";
import MeditateImg from "../../assets/img/Nav/Meditate.svg";
import MusicImg from "../../assets/img/Nav/Music.svg";
import ProfileImg from "../../assets/img/Nav/Profile.svg";
import YogaImg from "../../assets/img/Nav/Yoga.svg";
import { NavLink } from "react-router-dom";
import { UserDataContext, useUserData } from "../../context/UserDataContext";
import { useContext, useEffect } from "react";
// BUGFIX: Search wird zurückgesetzt 22.08
import { VideoDataContext } from "../../context/VideoDataContext";
import { MusicDataContext } from "../../context/MusicDataContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  // BUGFIX: Search wird zurückgesetzt 22.08
  const { resetSearchVideoData } = useContext(VideoDataContext);
  const { refetchData } = useContext(UserDataContext);
  const { resetSearchMusicData } = useContext(MusicDataContext);
  const { userData } = useUserData();
  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );

  // BUGFIX: Search wird zurückgesetzt 22.08
  const userId = storagedUserData?._id || userData?._id;
  const resetSearchData = () => {
    resetSearchVideoData();
    refetchData(userId);
    resetSearchMusicData();
  };

  return (
    <nav>
      <div className="nav-container">
        {/* <NavLink to="/category/yoga" activeClassName="activeNavLink"> */}
        <NavLink to="/category/yoga" onClick={resetSearchData}>
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={YogaImg} />
            </div>
            <p className="navText">Yoga</p>
          </div>
        </NavLink>

        <NavLink to="/category/meditation" onClick={resetSearchData}>
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={MeditateImg} />
            </div>
            <p className="navText">Meditate</p>
          </div>
        </NavLink>

        <NavLink to="/home" onClick={resetSearchData}>
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={HomeImg} />
            </div>
            <p className="navText">Home</p>
          </div>
        </NavLink>

        <NavLink to="/music" onClick={resetSearchData}>
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={MusicImg} />
            </div>
            <p className="navText">Music</p>
          </div>
        </NavLink>
        <NavLink to="/profile" onClick={resetSearchData}>
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={ProfileImg} />
            </div>
            <p className="navText">
              {userData?.name || storagedUserData?.name}
            </p>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
