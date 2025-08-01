import { createContext, useEffect, useState, useContext, useMemo, useCallback } from "react";
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
  const resetSearchDeezerData = useCallback(() => _refetch((prev) => !prev), []);

  // Initialize from session storage if available
  const [playlistData, setPlaylistData] = useState(() => {
    const stored = sessionStorage.getItem("sessionedPlaylistData");
    return stored ? JSON.parse(stored) : [];
  });
  const [playlistDetails, setPlaylistDetails] = useState(() => {
    const stored = sessionStorage.getItem("sessionedPlaylistDetails");
    return stored ? JSON.parse(stored) : [];
  });
  const [copyPlaylistData, setCopyPlaylistData] = useState(() => {
    const stored = sessionStorage.getItem("sessionedPlaylistData");
    return stored ? JSON.parse(stored) : [];
  });
  const [copyPlaylistDetails, setCopyPlaylistDetails] = useState(() => {
    const stored = sessionStorage.getItem("sessionedPlaylistDetails");
    return stored ? JSON.parse(stored) : [];
  });
  const [isLoadingPlaylistDetails, setIsLoadingPlaylistDetails] = useState(false);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  const fetchPlaylists = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingPlaylists(true);
    try {
      const response = await axios.get("/api/deezer/playlist");
      
      // Transform Deezer data to match expected format
      const transformedResponse = {
        data: {
          playlists: {
            items: response.data.data.filter(playlist => playlist && playlist.id)
          }
        }
      };
      
      setPlaylistData(transformedResponse);
      setCopyPlaylistData(transformedResponse);
      
      // Store in session storage immediately
      sessionStorage.setItem("sessionedPlaylistData", JSON.stringify(transformedResponse));
    } catch (error) {
      setPlaylistData([]);
      setCopyPlaylistData([]);
    } finally {
      setIsLoadingPlaylists(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  // Memoize playlist IDs to prevent unnecessary API calls
  const playlistIds = useMemo(() => {
    return activeUser?.playlists?.map(p => p.playlist_id).sort().join(',') || '';
  }, [activeUser?.playlists]);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeUser?.playlists?.length) {
        setPlaylistDetails([]);
        setCopyPlaylistDetails([]);
        return;
      }

      if (isLoadingPlaylistDetails) return; // Prevent multiple calls

      setIsLoadingPlaylistDetails(true);
      try {
        const playlistIdArray = activeUser.playlists.map(p => p.playlist_id);
        
        const response = await axios.post("/api/deezer/getPlaylistDetails", {
          ids: playlistIdArray,
        });
        
        if (response.data.error) {
          setPlaylistDetails([]);
          setCopyPlaylistDetails([]);
          return;
        }
        
        const validPlaylists = Array.isArray(response.data) ? response.data : [];
        
        setPlaylistDetails(validPlaylists);
        setCopyPlaylistDetails(validPlaylists);
        
        // Store in session storage immediately
        if (validPlaylists.length > 0) {
          sessionStorage.setItem("sessionedPlaylistDetails", JSON.stringify(validPlaylists));
        }
      } catch (error) {
        setPlaylistDetails([]);
        setCopyPlaylistDetails([]);
      } finally {
        setIsLoadingPlaylistDetails(false);
      }
    };

    fetchData();
  }, [playlistIds]);

  // Handle search reset - reapply the copy data to main data
  useEffect(() => {
    if (copyPlaylistData && Object.keys(copyPlaylistData).length > 0) {
      setPlaylistData(copyPlaylistData);
    }
  }, [shouldRefetch]);

  // Handle search reset for playlist details
  useEffect(() => {
    if (copyPlaylistDetails && copyPlaylistDetails.length > 0) {
      setPlaylistDetails(copyPlaylistDetails);
    }
  }, [shouldRefetch]);

  return (
    <DeezerDataContext.Provider
      value={{
        playlistData,
        playlistDetails,
        setPlaylistData,
        setPlaylistDetails,
        resetSearchDeezerData,
        isLoadingPlaylistDetails,
        isLoadingPlaylists,
      }}
    >
      {children}
    </DeezerDataContext.Provider>
  );
};