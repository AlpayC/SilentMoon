import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [accessToken, setAccesToken] = useState([]);
  const { user } = useContext(UserContext);
  const [tokenGenerated, setTokenGenerated] = useState(false);

  const [musicData, setMusicData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);

  // useEffect(() => {
  //   if (user !== null && !tokenGenerated) {
  //     const fetchAccessToken = async () => {
  //       const token = await axios.post("/api/spotify/auth");
  //       setAccesToken(token);

  //       setTokenGenerated(true);
  //     };
  //     fetchAccessToken();
  //   }
  // }, [user, tokenGenerated]);

  // useEffect(() => {
  //   const fetchPlaylist = async () => {
  //     const playlistData = await axios.get("/api/spotify/playlist");
  //     setMusicData(playlistData);
  //   };
  //   fetchPlaylist();
  // }, []);

  useEffect(() => {
    if (user !== null) {
      const fetchTracks = async () => {
        const response = await axios.get("/api/spotify/playlist");
        setPlaylistData(response);
        console.log(response);
      };
      fetchTracks();
    }
  }, [user]);

  // useEffect(() => {
  //   if (accessToken !== []) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://api.spotify.com/v1/playlists/${searchQuery}/tracks`,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           }
  //         );

  //         if (response.ok) {
  //           const data = await response.json();
  //           setMusicData(data);
  //           console.log(data);
  //         } else {
  //           console.error(
  //             "Error fetching playlist tracks:",
  //             response.statusText
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching playlist tracks:", error);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [accessToken]);

  return (
    <MusicDataContext.Provider
      value={{
        accessToken,
        musicData,
        playlistData,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
};
