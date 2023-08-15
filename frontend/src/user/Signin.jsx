import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import BackButon from "../components/BackButton/BackButton.jsx";
import Button from "../components/Button/Button.jsx";

export default function Signin() {
  const { refetch } = useContext(UserContext);
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/login", data);
      refetch();
      // Hier muss ein Context gespeichert werden, der den token von spotify generiert wird
      // mit createContext, refresh, und ein if else, welcher prüft, ob das token noch gültig ist oder nicht
      // evtl mit einer funktion wie in zeile 18 eine gesonderte function starten
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };

  return (
    <div className="main-wrapper background-signinup">
      <BackButon />
      <h1 className="center padding-top-bottom">Welcome Back!</h1>
      <form className="column" onSubmit={submit}>
        <input name="email" type="email" placeholder="EMAIL" />
        <input name="password" type="password" placeholder="PASSWORD" />
        {error && <small style={{ color: "red" }}>{error}</small>}
        <Button text="login" />
        <p className="center grey-text">
          DON'T HAVE AN ACCOUNT YET? <Link to={"../signup"}>SIGN UP</Link>
        </p>
      </form>
    </div>
  );
}
