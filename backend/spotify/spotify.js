import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { Music } from "./MusicModel.js";
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
      res.send(token);
    } else {
      res.status(response.status || 500).send("Error");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});
spotifyRouter.get("/", async (req, res) => {
  const musictitles = await Music.find();
  res.send(musictitles);
});
