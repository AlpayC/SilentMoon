import { useContext } from "react";
import { UserContext } from "../../user/UserContext";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import "./WelcomePage.css";
import WelcomeImage from "../../assets/img/WelcomePage/bg-person.png";

const WelcomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <section>
        <section
          className="welcomePage"
          style={{ backgroundImage: `url(${WelcomeImage})` }}
        >
          <div className="main-wrapper">
            <Logo className="logo-white" />
            <div className="welcomeText">
              <h1>Hi Leon {user}, welcome to Silent Moon</h1>
            </div>
          </div>
        </section>
        <NavLink to={"/reminder"} className="getStartedBtn">
          <Button text="GET STARTED" />
        </NavLink>
      </section>
    </>
  );
};

export default WelcomePage;
