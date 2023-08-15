import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={submit}>
      <input name="email" type="email" placeholder="your email" />
      <input name="password" type="password" placeholder="***********" />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Login</button>
    </form>
  );
}
