import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [accessToken, setAccesToken] = useState([]);
  const { user } = useContext(UserContext);
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const searchQuery = "meditation yoga";
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    if (user !== null && !tokenGenerated) {
      const fetchAccessToken = async () => {
        const token = await axios.post("/api/spotify/auth");
        setAccesToken(token.data.access_token);
        setTokenGenerated(true);
      };
      fetchAccessToken();
    }
  }, [user, tokenGenerated]);

  useEffect(() => {
    if (accessToken !== []) {
      const fetchData = async () => {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            searchQuery
          )}&type=track`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        ).then((response) => {
          response.json().then((data) => {
            setMusicData(data);
            console.log(musicData);
          });
        });
      };
      fetchData();
    }
  }, [accessToken]);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  return (
    <MusicDataContext.Provider
      value={{
        accessToken,
        musicData,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
};
