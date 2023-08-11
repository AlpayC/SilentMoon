import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [shouldRefetch, _refetch] = useState(true);
  const [user, setUser] = useState(null);

  const refetch = () => _refetch((prev) => !prev);

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

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};
