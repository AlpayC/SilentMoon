import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButon from "../components/BackButton/BackButton.jsx";
import Button from "../components/Button/Button.jsx";

const isProd = process.env.NODE_ENV === "production";

export default function Signup() {
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/signup", data);

      if (isProd) {
        nav("/login");
      }
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  return (
    <div className="main-wrapper background-signinup">
      <BackButon />
      <h1 className="center padding-top-bottom">Create your account</h1>
      <form className="column" onSubmit={submit}>
        <input
          className="input"
          name="name"
          type="text"
          placeholder="FIRST NAME"
        />
        <input
          className="input"
          name="surname"
          type="text"
          placeholder="LAST NAME"
        />
        <input className="input" name="email" type="text" placeholder="MAIL" />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="PASSWORD"
        />
        {error && <small style={{ color: "red" }}>{error}</small>}
        <Button text="register" />
      </form>
    </div>
  );
}
