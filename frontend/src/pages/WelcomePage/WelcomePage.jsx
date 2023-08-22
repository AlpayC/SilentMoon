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

  // BUGFIX: Reminder Redirection 22.08
  useEffect(() => {
    const isUserDataValid =
      userData?.reminderdays?.length > 0 && userData?.remindertime?.length > 0;

    const isStoragedDataValid =
      storagedUserData?.reminderdays?.length > 0 &&
      storagedUserData?.remindertime?.length > 0;

    if (!isUserDataValid || !isStoragedDataValid) {
      setRedirection("/reminder");
    } else {
      setRedirection("/home");
    }
  }, [userData, storagedUserData]);

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
