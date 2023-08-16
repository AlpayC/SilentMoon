import { Router } from "express";
import multer from "multer";
import { Video } from "./PostModel.js";
import { authenticateToken, generateAccessToken } from "../user/authToken.js";

export const exercisesRouter = Router();

const multerMiddleware = multer();

const hoursInMillisec = (hours) => {
  return 1000 * 60 * 60 * hours;
};

exercisesRouter.get("/", async (req, res) => {
  const users = await Video.find();
  res.send(users);
});

exercisesRouter.get("/details/:id", async (req, res) => {
  try {
    const exercise = await Video.findById(req.params.id);
    res.send(exercise);
    console.log(exercise);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

exercisesRouter.get("/filter", async (req, res) => {
  try {
    const filters = req.query;

    // Beispiel Query:
    // req.query = {
    //   room: "Wohnzimmer",
    //   size: "klein"
    // };

    const sortBy = filters.sortBy; // Zwischenspeichern der sortBy Query

    // Erstellen eines Filterobjekts für die Datenbankabfrage
    // Angenommen, die "key" in den Filtern entspricht dem Datenbankfeld
    const filterObject = {};
    for (const key in filters) {
      if (key !== "sortBy") {
        filterObject[key] = { $regex: new RegExp(filters[key], "i") };
      }
    }
    // Output:
    // filterObject = {
    //   room: { $regex: /Wohnzimmmer/i },
    //   size: { $regex: /klein/i }
    // };
    let query = Video.find(filterObject);

    // Sortierung basierend auf dem sortBy-Schlüssel
    if (sortBy) {
      // Wenn sortBy mit "asc" angegeben ist, wird aufsteigend sortiert
      // Ansonsten wird standardmäßig absteigend sortiert
      const sortOrder = sortBy === "asc" ? 1 : -1;
      query = query.sort({ [sortBy]: sortOrder });
    }

    let responseData = await query.exec();
    res.json(responseData);
    console.log(responseData.length);
  } catch (error) {
    console.error("Fehler beim Verarbeiten der Anfrage:", error);
    res.status(500).send("Interner Serverfehler");
  }
});
