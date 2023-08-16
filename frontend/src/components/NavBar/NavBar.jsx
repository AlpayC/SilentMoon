import "./NavBar.css";
import HomeImg from "../../assets/img/Nav/Home.svg";
import MeditateImg from "../../assets/img/Nav/Meditate.svg";
import MusicImg from "../../assets/img/Nav/Music.svg";
import ProfileImg from "../../assets/img/Nav/Profile.svg";
import YogaImg from "../../assets/img/Nav/Yoga.svg";
import {NavLink} from "react-router-dom"


const NavBar = () => {
  return (
      <nav>
        <div className="nav-container">
        <NavLink to="/category/yoga" activeClassName="activeNavLink">
        <div className="navItem">
        <div className="navImgContainer">
          <img className="navImg" src={YogaImg} />
          </div>
          <p className="navText">Yoga</p>
        </div>
        </NavLink>

        <NavLink to="/category/meditate">
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
          <p className="navText">Profile</p>
        </div>
        </NavLink>
        </div>
      </nav>
  );
};

export default NavBar;
