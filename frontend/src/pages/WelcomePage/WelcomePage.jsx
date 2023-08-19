import { useEffect, useState } from "react";
import { useUserData } from "../../context/UserDataContext";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import "./WelcomePage.css";
import WelcomeImage from "../../assets/img/WelcomePage/bg-person.png";

const WelcomePage = () => {
  const { userData } = useUserData();
  const [redirection, setRedirection] = useState();
  useEffect(() => {
    console.log(userData);
    if (userData.reminderdays.length === 0) {
      return setRedirection("/reminder");
    }
    setRedirection("/home");
  }, []);
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
              <h1>Hi {userData.name}, welcome to Silent Moon</h1>
            </div>
          </div>
        </section>
        <NavLink to={redirection} className="getStartedBtn">
          <Button text="GET STARTED" />
        </NavLink>
      </section>
    </>
  );
};

export default WelcomePage;
