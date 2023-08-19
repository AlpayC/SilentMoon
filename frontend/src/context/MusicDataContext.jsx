import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";
import { useUserData } from "../context/UserDataContext";

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [accessToken, setAccesToken] = useState([]);
  const { user } = useContext(UserContext);
  const { userData } = useUserData();
  const [tokenGenerated, setTokenGenerated] = useState(false);

  const [musicData, setMusicData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState([]);

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

  useEffect(() => {
    if (user !== null) {
      const id = { _id: userData?._id };
      const fetchPlaylistDetails = async () => {
        const response = await axios.post(
          "/api/spotify/getPlaylistDetails",
          id
        );
        setPlaylistDetails(response.data);
        console.log(response);
      };
      fetchPlaylistDetails();
    }
  }, [user, userData]);

  return (
    <MusicDataContext.Provider
      value={{
        accessToken,
        musicData,
        playlistData,
        playlistDetails,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
};
