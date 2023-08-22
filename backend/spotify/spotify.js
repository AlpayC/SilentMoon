import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { Playlist } from "./MusicModel.js";
import User from "../user/UserModel.js";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;

export const spotifyRouter = Router();

let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

spotifyRouter.post("/auth", async (req, res) => {
  try {
    const response = await axios.post(authOptions.url, null, {
      headers: authOptions.headers,
      params: authOptions.form,
    });

    if (response.status === 200) {
      const token = response.data;
      accessToken = token;
      console.log(accessToken);
      res.send("Token generated");
      // res.send(accessToken);
    } else {
      res.status(response.status || 500).send("Error");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});
spotifyRouter.get("/", async (req, res) => {
  const musictitles = await Playlist.find();
  res.send(musictitles);
});

spotifyRouter.post("/tracks", async (req, res) => {
  const { id } = req.body;

  try {
    const { data } = await axios.post(authOptions.url, null, {
      headers: authOptions.headers,
      params: authOptions.form,
    });

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    if (response.status === 200) {
      const spotifyData = response.data;
      console.log("SpotifyData", spotifyData);
      res.status(200).json(spotifyData);
    } else {
      res
        .status(response.status || 500)
        .json({ error: "Error fetching Spotify data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

spotifyRouter.post("/onetrack", async (req, res) => {
  const { id } = req.body;

  try {
    const { data } = await axios.post(authOptions.url, null, {
      headers: authOptions.headers,
      params: authOptions.form,
    });

    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    if (response.status === 200) {
      const spotifyData = response.data;
      console.log("SpotifyData", spotifyData);
      res.status(200).json(spotifyData);
    } else {
      res
        .status(response.status || 500)
        .json({ error: "Error fetching Spotify data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

spotifyRouter.get("/playlist", async (req, res) => {
  const searchQueryPlaylist = "meditation yoga";

  try {
    const { data } = await axios.post(authOptions.url, null, {
      headers: authOptions.headers,
      params: authOptions.form,
    });

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchQueryPlaylist
      )}&type=playlist`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    if (response.status === 200) {
      const spotifyData = response.data;

      res.status(200).json(spotifyData);
    } else {
      res
        .status(response.status || 500)
        .json({ error: "Error fetching Spotify data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

spotifyRouter.post("/getPlaylistDetails", async (req, res) => {
  try {
    const { data } = await axios.post(authOptions.url, null, {
      headers: authOptions.headers,
      params: authOptions.form,
    });

    const { _id } = req.body;
    const { playlists } = await User.findOne({ _id });
    console.log(playlists);
    const playlistIds = playlists.map((playlist) => playlist.playlist_id);

    const playlistDetails = await Promise.all(
      playlistIds.map(async (playlistId) => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );
        return response.data;
      })
    );

    res.status(200).json(playlistDetails);
  } catch (error) {
    console.error("Error fetching playlist details:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
