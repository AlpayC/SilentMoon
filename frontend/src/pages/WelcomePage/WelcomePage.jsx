import { useEffect, useState } from "react";
import { useUserData } from "../../context/UserDataContext";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import "./WelcomePage.css";
import WelcomeImage from "../../assets/img/WelcomePage/bg-person.png";

const WelcomePage = () => {
  const { userData } = useUserData();
  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );

  const [redirection, setRedirection] = useState();
  useEffect(() => {
    if (
      userData?.reminderdays.length === null ||
      storagedUserData?.reminderdays.length === null
    ) {
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
            <Logo className={"logo-white"} />
            <div className="welcomeText">
              <h1>
                Hi {userData?.name || storagedUserData?.name}, welcome to Silent
                Moon
              </h1>
            </div>
            <NavLink to={redirection} className="getStartedBtn">
              <Button text="GET STARTED" />
            </NavLink>
          </div>
        </section>
      </section>
    </>
  );
};

export default WelcomePage;
