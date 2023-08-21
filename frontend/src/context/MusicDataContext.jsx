import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";
import { useUserData } from "../context/UserDataContext";

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { userData } = useUserData();
  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );

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
    const fetchData = async () => {
      if (user) {
        const playlistId = storagedUserData?._id || userData?._id;
        const response = await axios.post("/api/spotify/getPlaylistDetails", {
          _id: playlistId,
        });
        setPlaylistDetails(response.data);
        console.log(response);
      }
    };
    fetchData();
  }, [user, userData]);

  useEffect(() => {
    if (playlistData) {
      sessionStorage.setItem(
        "sessionedPlaylistData",
        JSON.stringify(playlistData)
      );
    }
  }, [playlistData]);
  useEffect(() => {
    if (playlistDetails) {
      sessionStorage.setItem(
        "sessionedPlaylistDetails",
        JSON.stringify(playlistDetails)
      );
    }
  }, [playlistDetails]);
  return (
    <MusicDataContext.Provider
      value={{
        playlistData,
        playlistDetails,
        setPlaylistData,
        setPlaylistDetails,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
};
