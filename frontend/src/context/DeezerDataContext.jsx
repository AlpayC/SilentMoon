import { createContext, useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";
import { useUserData } from "./UserDataContext";

export const DeezerDataContext = createContext();

export const DeezerDataProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { userData } = useUserData();
  
  // Use userData from UserDataContext as it has the complete user data including playlists
  // Memoize to prevent unnecessary re-renders
  const activeUser = useMemo(() => userData || user, [userData, user]);

  const [shouldRefetch, _refetch] = useState(true);
  const resetSearchDeezerData = () => _refetch((prev) => !prev);

  const [playlistData, setPlaylistData] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [copyPlaylistData, setCopyPlaylistData] = useState([]);
  const [copyPlaylistDetails, setCopyPlaylistDetails] = useState([]);
  const [isLoadingPlaylistDetails, setIsLoadingPlaylistDetails] = useState(false);

  useEffect(() => {
    if (user !== null) {
      const fetchPlaylists = async () => {
        try {
          const response = await axios.get("/api/deezer/playlist");
          console.log("Deezer playlists response:", response);
          
          // Transform Deezer data to match expected format
          const transformedResponse = {
            data: {
              playlists: {
                items: response.data.data.filter(playlist => playlist && playlist.id)
              }
            }
          };
          
          console.log("Transformed Deezer data:", transformedResponse);
          setPlaylistData(transformedResponse);
          setCopyPlaylistData(transformedResponse);
        } catch (error) {
          console.error("Error fetching Deezer playlists:", error);
        }
      };
      fetchPlaylists();
    }
  }, [user]);

  // Memoize playlist IDs to prevent unnecessary API calls
  const playlistIds = useMemo(() => {
    return activeUser?.playlists?.map(p => p.playlist_id).sort().join(',') || '';
  }, [activeUser?.playlists]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeUser && activeUser.playlists?.length > 0 && !isLoadingPlaylistDetails) {
        setIsLoadingPlaylistDetails(true);
        try {
          // Get all playlist IDs
          const playlistIdArray = activeUser.playlists.map(p => p.playlist_id);
          
          // Make single API call with all IDs
          const response = await axios.post("/api/deezer/getPlaylistDetails", {
            ids: playlistIdArray,
          });
          
          if (response.data.error) {
            console.error('API returned error:', response.data.error);
            setPlaylistDetails([]);
            setCopyPlaylistDetails([]);
            return;
          }
          
          // Response should already be an array of playlist details
          const validPlaylists = Array.isArray(response.data) ? response.data : [];
          
          setPlaylistDetails(validPlaylists);
          setCopyPlaylistDetails(validPlaylists);
        } catch (error) {
          console.error("Error fetching playlist details:", error);
          setPlaylistDetails([]);
          setCopyPlaylistDetails([]);
        } finally {
          setIsLoadingPlaylistDetails(false);
        }
      } else if (!isLoadingPlaylistDetails) {
        setPlaylistDetails([]);
        setCopyPlaylistDetails([]);
      }
    };

    fetchData();
  }, [playlistIds]);

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
    <DeezerDataContext.Provider
      value={{
        playlistData,
        playlistDetails,
        setPlaylistData,
        setPlaylistDetails,
        resetSearchDeezerData,
      }}
    >
      {children}
    </DeezerDataContext.Provider>
  );
};