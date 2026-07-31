import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { userRouter } from "./user/routes.js";
import { spotifyRouter } from "./spotify/spotify.js";
import { deezerRouter } from "./deezer/deezer.js";
import { exercisesRouter } from "./exercises/routes.js";
import { generalLimiter } from "./middleware/rateLimiting.js";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.DB);
await mongoose.connection.syncIndexes();

const PORT = process.env.PORT || 3002;
// Force restart
const app = express();

// Hinter dem Reverse Proxy (Traefik bei Coolify) steht die echte Client-IP in
// X-Forwarded-For. Ohne diese Einstellung sieht express-rate-limit nur die
// Proxy-IP und zaehlt alle Nutzer als einen. Bewusst 1 statt true: true wuerde
// der gesamten Kette vertrauen, sodass Clients den Header faelschen und das
// Rate Limiting umgehen koennten.
app.set("trust proxy", 1);

const ReactAppDistPath = new URL("../frontend/dist/", import.meta.url);
const ReactAppIndex = new URL("../frontend/dist/index.html", import.meta.url);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      mediaSrc: ["'self'", "https://res.cloudinary.com", "https://cdnt-preview.dzcdn.net"],
      connectSrc: ["'self'", "https://api.deezer.com", "https://api.spotify.com"],
    },
  },
}));

// Rate limiting (disabled in development)
if (process.env.NODE_ENV !== 'development') {
  app.use(generalLimiter);
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static files
app.use(express.static(ReactAppDistPath.pathname));

// API routes
app.use("/api/user", userRouter);
app.use("/api/spotify", spotifyRouter);
app.use("/api/deezer", deezerRouter);
app.use("/api/exercises", exercisesRouter);

/*
 * express.static matches every file in the specified folder
 * and creates a request handler for FREE
 * app.get("/",(req,res)=> res.sendFile("path/to/index.html"))
 * app.get("/index.html",(req,res)=> res.sendFile("path/to/index.html"))
 */

app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});
