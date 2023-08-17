import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [shouldRefetch, _refetch] = useState(true);
  const [user, setUser] = useState(null);
  // const [accessToken, setAccesToken] = useState([]);

  const refetch = () => _refetch((prev) => !prev);

  // const [tokenGenerated, setTokenGenerated] = useState(false);
  const logout = async () => {
    await axios.get("/api/user/logout");
    setUser(null);
    nav("/");
  };

  useEffect(() => {
    axios
      .get("/api/user/secure")
      .then(({ data }) => setUser(data))
      .catch((e) => {
        setUser(null);
      });
  }, [shouldRefetch]);

  // useEffect(() => {
  //   if (user !== null && !tokenGenerated) {
  //     const fetchAccessToken = async () => {
  //       const token = await axios.post("/api/spotify/auth");
  //       setAccesToken(token.data.access_token);
  //       setTokenGenerated(true);
  //     };
  //     fetchAccessToken();
  //   }
  // }, [user, tokenGenerated]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        refetch,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
