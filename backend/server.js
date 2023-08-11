import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";

import { userRouter } from "./user/routes.js";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.DB);
await mongoose.connection.syncIndexes();

const PORT = process.env.PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../frontend/dist/", import.meta.url);
const ReactAppIndex = new URL("../frontend/dist/index.html", import.meta.url);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(ReactAppDistPath.pathname));
app.use("/api/user", userRouter);

/*
 * express.static matched auf jede Datei im angegebenen Ordner
 * und erstellt uns einen request handler for FREE
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
