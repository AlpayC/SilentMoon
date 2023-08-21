import "./NavBar.css";
import HomeImg from "../../assets/img/Nav/Home.svg";
import MeditateImg from "../../assets/img/Nav/Meditate.svg";
import MusicImg from "../../assets/img/Nav/Music.svg";
import ProfileImg from "../../assets/img/Nav/Profile.svg";
import YogaImg from "../../assets/img/Nav/Yoga.svg";
import { NavLink } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { useContext } from "react";

const NavBar = () => {
  const { userData } = useUserData();
  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );
  return (
    <nav>
      <div className="nav-container">
        {/* <NavLink to="/category/yoga" activeClassName="activeNavLink"> */}
        <NavLink to="/category/yoga">
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={YogaImg} />
            </div>
            <p className="navText">Yoga</p>
          </div>
        </NavLink>

        <NavLink to="/category/meditation">
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={MeditateImg} />
            </div>
            <p className="navText">Meditate</p>
          </div>
        </NavLink>

        <NavLink to="/home">
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={HomeImg} />
            </div>
            <p className="navText">Home</p>
          </div>
        </NavLink>

        <NavLink to="/music">
          <div className="navItem">
            <div className="navImgContainer">
              <img className="navImg" src={MusicImg} />
            </div>
            <p className="navText">Music</p>
          </div>
        </NavLink>
        <NavLink to="/profile">
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
