import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";
import { useUserData } from "../context/UserDataContext";

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { userData } = useUserData();
  // BUGFIX: Search wird zurückgesetzt 22.08

  const [shouldRefetch, _refetch] = useState(true);
  const resetSearchMusicData = () => _refetch((prev) => !prev);
  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );

  const [playlistData, setPlaylistData] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [copyPlaylistData, setCopyPlaylistData] = useState([]);
  const [copyPlaylistDetails, setCopyPlaylistDetails] = useState([]);

  useEffect(() => {
    if (user !== null) {
      const fetchTracks = async () => {
        const response = await axios.get("/api/spotify/playlist");
        setPlaylistData(response);
        setCopyPlaylistData(response);
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
        setCopyPlaylistDetails(response.data);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem(
      "sessionedPlaylistData",
      JSON.stringify(copyPlaylistData)
    );
    setPlaylistData(copyPlaylistData);
  }, [shouldRefetch, copyPlaylistData]);

  useEffect(() => {
    sessionStorage.setItem(
      "sessionedPlaylistDetails",
      JSON.stringify(copyPlaylistDetails)
    );
    setPlaylistDetails(copyPlaylistDetails);
  }, [shouldRefetch, copyPlaylistDetails]);

  return (
    <MusicDataContext.Provider
      value={{
        playlistData,
        playlistDetails,
        setPlaylistData,
        setPlaylistDetails,
        resetSearchMusicData,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
};
