import { Router } from "express";
import axios from "axios";

export const deezerRouter = Router();

const DEEZER_BASE_URL = "https://api.deezer.com";

deezerRouter.get("/playlist", async (req, res) => {
  const searchQuery = "meditation yoga ambient";
  try {
    const response = await axios.get(
      `${DEEZER_BASE_URL}/search/playlist?q=${encodeURIComponent(searchQuery)}&limit=50`
    );
    
    
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Deezer playlists:", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

deezerRouter.post("/tracks", async (req, res) => {
  const { id } = req.body;
  try {
    const response = await axios.get(`${DEEZER_BASE_URL}/playlist/${id}/tracks`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Deezer tracks:", error);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

deezerRouter.get("/onetrack/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${DEEZER_BASE_URL}/track/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Deezer track:", error);
    res.status(500).json({ error: "Failed to fetch track" });
  }
});

deezerRouter.post("/getPlaylistDetails", async (req, res) => {
  const { id, ids } = req.body;
  
  
  try {
    // If multiple IDs are provided, fetch all of them
    if (ids && Array.isArray(ids)) {
      const playlistPromises = ids.map(async (playlistId) => {
        try {
          const response = await axios.get(`${DEEZER_BASE_URL}/playlist/${playlistId}`);
          
          // Check if Deezer API returned an error
          if (response.data.error) {
            return { id: playlistId, error: response.data.error };
          }
          
          return response.data;
        } catch (error) {
          return null;
        }
      });
      
      const playlists = await Promise.all(playlistPromises);
      const validPlaylists = playlists.filter(playlist => playlist !== null && !playlist.error);
      const errorPlaylists = playlists.filter(playlist => playlist?.error);
      
      
      // If no valid playlists but we have errors, return more detailed info
      if (validPlaylists.length === 0 && errorPlaylists.length > 0) {
        res.status(200).json({ 
          validPlaylists: [], 
          errors: errorPlaylists,
          message: `All ${errorPlaylists.length} playlists failed to load`
        });
      } else {
        res.json(validPlaylists);
      }
    } 
    // Single ID (backwards compatibility)
    else if (id) {
      const response = await axios.get(`${DEEZER_BASE_URL}/playlist/${id}`);
      res.json(response.data);
    } else {
      res.status(400).json({ error: "Either 'id' or 'ids' parameter is required" });
    }
  } catch (error) {
    console.error("Error fetching Deezer playlist details:", error);
    res.status(500).json({ error: "Failed to fetch playlist details" });
  }
});