import { createContext, useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";
import { useUserData } from "../context/UserDataContext";

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { userData } = useUserData();
  // BUGFIX: Search wird zurückgesetzt 22.08

  const [shouldRefetch, _refetch] = useState(true);
  const resetSearchMusicData = useCallback(() => _refetch((prev) => !prev), []);
  const [refreshPlaylistDetails, _refresh] = useState(true);
  const refreshPlaylistData = useCallback(() => _refresh((prev) => !prev), []);
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
        // setPlaylistData(response);
        // setCopyPlaylistData(response);
        const filteredPlaylists = response.data.playlists.items.filter(
          (playlist) =>
            playlist &&
            playlist.id !== "2TSqBzonsoTHZ8dXeu7gVF" &&
            playlist.id !== "3u3z3wxohxmsp3cOP1ffJ9"
        );
        const updatedResponse = {
          data: {
            playlists: {
              ...response.data.playlists,
              items: filteredPlaylists,
            },
          },
        };
        setPlaylistData(updatedResponse);
        setCopyPlaylistData(updatedResponse);
        
        // Store in session storage immediately
        sessionStorage.setItem("sessionedPlaylistData", JSON.stringify(updatedResponse));
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
        
        // Store in session storage immediately
        sessionStorage.setItem("sessionedPlaylistDetails", JSON.stringify(response.data));
      }
    };
    fetchData();
  }, [user, refreshPlaylistDetails]);

  // Handle search reset - reapply the copy data to main data
  useEffect(() => {
    if (copyPlaylistData && Object.keys(copyPlaylistData).length > 0) {
      setPlaylistData(copyPlaylistData);
    }
  }, [shouldRefetch]);

  // Handle playlist details reset
  useEffect(() => {
    if (copyPlaylistDetails && copyPlaylistDetails.length > 0) {
      setPlaylistDetails(copyPlaylistDetails);
    }
  }, [shouldRefetch]);

  return (
    <MusicDataContext.Provider
      value={{
        playlistData,
        playlistDetails,
        setPlaylistData,
        setPlaylistDetails,
        resetSearchMusicData,
        refreshPlaylistData,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
};
