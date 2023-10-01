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

  const handleLoginResponse = (response) => {
    const filteredObject = {
      name: response.data.data.name,
      lastname: response.data.data.lastname,
      email: response.data.data.email,
      _id: response.data.data._id,
      reminderdays: response.data.data.reminderdays,
      remindertime: response.data.data.remindertime,
      playlists: response.data.data.playlists,
      videos: response.data.data.videos,
      // ToDo: Profile picture, if needed on the details page
    };

    setUserData(filteredObject);
    refetch();
    nav("/welcome");
  };

  const submitAsTestUser = async () => {
    const testUserLogin = {
      email: "testuser@login.com",
      password: "testuser",
    };
    try {
      console.log(testUserLogin);
      const response = await axios.post("/api/user/login", testUserLogin);
      handleLoginResponse(response);
    } catch {
      console.error();
      setError("An error occurred, try again later");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      const response = await axios.post("/api/user/login", formData);
      handleLoginResponse(response);
    } catch (e) {
      console.error(e);
      setError("An error occurred, try again later");
    }
  };
  return (
    <div className="main-wrapper background-signinup flex">
      <BackButon relativeClass="back-btn" />
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
          DON'T HAVE AN ACCOUNT YET? <Link to={"/signup"}>SIGN UP</Link>
        </p>
      </form>
      <button className="main-btn" onClick={() => submitAsTestUser()}>
        Login for Guests
      </button>
    </div>
  );
}
