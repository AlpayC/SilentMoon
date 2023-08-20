import { NavLink } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import Button from "../components/Button/Button";
import LoginImage from "../assets/img/Login/bg-person-handstand.png";
import "./Login.css";

const Login = () => {
  return (
    <>
      <section>
        <section
          className="loginPage"
          style={{ backgroundImage: `url(${LoginImage})` }}
        >
          <div>
            <Logo className="logo-black main-wrapper" />
          </div>
        </section>
        <section className="loginContainer">
          <h1>We are what we do</h1>
          <p>
            Thousand of people are using silent moon for meditation and yoga
            classes.
          </p>
          <div className="signingLinks">
            <NavLink to={"./signup"} className="navLink">
              <Button text="SIGN UP" />
            </NavLink>
            <NavLink to={"./signin"} className="navLink">
              ALREADY HAVE AN ACCOUNT? <span>LOG IN</span>
            </NavLink>
          </div>
        </section>
      </section>
    </>
  );
};

export default Login;
