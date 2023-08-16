import axios from "axios";

import BackButon from "../components/BackButton/BackButton.jsx";
import Button from "../components/Button/Button.jsx";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { UserDataContext } from "../context/UserDataContext";

export default function Signin() {
  const { refetch } = useContext(UserContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      // await axios.post("/api/user/login", data);
      const response = await axios.post("/api/user/login", data);

      setUserData(response.data.data.name);
      refetch();

      nav("/profile");
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };

  console.log(userData);
  return (
    <div className="main-wrapper background-signinup">
      <BackButon />
      <h1 className="center padding-top-bottom">Welcome Back!</h1>
      <form className="column" onSubmit={submit}>
        <input
          className="input"
          name="email"
          type="email"
          placeholder="EMAIL"
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="PASSWORD"
        />
        {error && <small style={{ color: "red" }}>{error}</small>}
        <Button text="login" />
        <p className="center grey-text">
          DON'T HAVE AN ACCOUNT YET? <Link to={"../signup"}>SIGN UP</Link>
        </p>
      </form>
    </div>
  );
}
