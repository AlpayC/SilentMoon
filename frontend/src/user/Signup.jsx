import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButon from "../components/BackButton/BackButton.jsx";
import Button from "../components/Button/Button.jsx";

const isProd = process.env.NODE_ENV === "production";

export default function Signup() {
  const [error, setError] = useState(null);
  //! 2208 added
  const [isRegistered, setIsRegistered] = useState(false);

  const nav = useNavigate();

  //! 2208 added
  useEffect(() => {
    if (isRegistered) {
      const timeoutId = setTimeout(() => {
        nav("/signin");
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isRegistered, nav]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/signup", data);
      //! 2208 added
      setIsRegistered(true);
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  //! 2208 bugfix + added, rückmeldung
  return (
    <div className="main-wrapper background-signinup">
      <BackButon relativeClass="back-btn" />
      <h1 className="center padding-top-bottom">Create your account</h1>
      {isRegistered ? (
        <div>
          <p>
            Registration successful! You can now log in. You will shortly be
            redirected!
          </p>
          <Link to="/signin">Go to Login</Link>
        </div>
      ) : (
        <form className="column" onSubmit={submit}>
          <input
            className="input"
            name="name"
            type="text"
            placeholder="FIRST NAME"
          />
          <input
            className="input"
            name="lastname"
            type="text"
            placeholder="LAST NAME"
          />
          <input
            className="input"
            name="email"
            type="text"
            placeholder="MAIL"
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="PASSWORD"
          />
          {error && <small style={{ color: "red" }}>{error}</small>}
          <Button text="register" />
        </form>
      )}
    </div>
  );
}
