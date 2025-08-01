import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import { 
  validateSignup, 
  validateLogin, 
  validateExerciseId, 
  validatePlaylistId, 
  validateReminder,
  handleValidationErrors 
} from "../middleware/validation.js";
import { authLimiter, dataModificationLimiter } from "../middleware/rateLimiting.js";

export const userRouter = Router();

const multerMiddleware = multer();

const hoursInMillisec = (hours) => {
  return 1000 * 60 * 60 * hours;
};

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.post("/getUserData/", authenticateToken, async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.findOne({ _id });
    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Check if the requested user is the same as the authenticated user
    if (user.id !== req.body._id) {
      return res.status(403).send("Forbidden");
    }

    // If the user is authorized, send the user data as the response
    res.send(user);
  } catch (err) {
    // Handle errors appropriately
    res.sendStatus(500);
  }
});

userRouter.post("/signup", authLimiter, multerMiddleware.none(), validateSignup, handleValidationErrors, async (req, res) => {
  // Create new user
  const { name, email, lastname } = req.body;
  const newUser = new User({ name, lastname, email });
  // Set password (hash and salt)
  newUser.setPassword(req.body.password);
  // Save user
  try {
    await newUser.save();
    return res.send({
      data: {
        message: "New user created",
        user: { name, lastname, email },
      },
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).send({ error: e });
    }

    // Duplication Error - email already exists as user
    if (e.name === "MongoServerError" && e.code === 11000) {
      return res.status(400).send({
        error: { message: "Username and Password combination not valid" },
      });
    }

    return res.status(500).send({ error: { message: "Unknown Server error" } });
  }
});

userRouter.post("/login", authLimiter, multerMiddleware.none(), validateLogin, handleValidationErrors, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+hash").select("+salt");
  // This password would produce the same hash as in the database
  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    const token = generateAccessToken({ email });

    res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMillisec(4) });

    res.send({ message: "Success", data: user });
  } else {
    res.status(404).send({
      message: "Failed to login",
      error: {
        message: "Password and E-Mail combination is wrong.",
      },
    });
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("OK");
});

userRouter.get("/secure", authenticateToken, async (req, res) => {
  res.send({ email: req.userEmail });
});

userRouter.put("/addexercise", dataModificationLimiter, authenticateToken, validateExerciseId, handleValidationErrors, async (req, res) => {
  try {
    const { _id } = req.body;
    const { exercise_id } = req.body;
    const user = await User.findOne({ _id });

    if (user.videos.includes(exercise_id)) {
      return res.send("Video already exists");
    }
    user.videos.push(exercise_id);
    await user.save();
    res.send("Video added");
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("There was an error.");
  }
});

userRouter.put("/deleteexercise", dataModificationLimiter, authenticateToken, validateExerciseId, handleValidationErrors, async (req, res) => {
  try {
    const { _id } = req.body;
    const { exercise_id } = req.body;
    const user = await User.findOne({ _id });
    if (user.videos.some((item) => item.equals(exercise_id))) {
      user.videos = user.videos.filter((item) => !item.equals(exercise_id));
      await user.save();
      return res.send("Video removed from favorites");
    } else {
      res.send("Video is not in favorites");
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("There was an error.");
  }
});

userRouter.put("/addplaylist", dataModificationLimiter, authenticateToken, validatePlaylistId, handleValidationErrors, async (req, res) => {

  try {
      const { _id } = req.body;
    const { playlist_id } = req.body;
    const user = await User.findOne({ _id });
    const playlistExists = user.playlists.some(
      (playlist) => playlist.playlist_id === playlist_id
    );

    if (playlistExists) {
      return res.status(200).send("Playlist exists");
    }
    user.playlists.push({ playlist_id });
    await user.save();
    res.status(201).send("Playlist added");
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("There was an error.");
  }
});

userRouter.put("/deleteplaylist", dataModificationLimiter, authenticateToken, validatePlaylistId, handleValidationErrors, async (req, res) => {
  try {
    const { _id, playlist_id } = req.body;
    const user = await User.findOne({ _id });

    const playlistIndex = user.playlists.findIndex(
      (item) => item.playlist_id === playlist_id
    );

    if (playlistIndex !== -1) {
      user.playlists.splice(playlistIndex, 1);
      await user.save();

      return res.send("Playlist removed from favorites");
    } else {
      res.send("Playlist is not in favorites");
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("There was an error.");
  }
});

userRouter.put("/updatereminder", dataModificationLimiter, authenticateToken, validateReminder, handleValidationErrors, async (req, res) => {
  try {
    const { _id, reminderdays, remindertime } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { reminderdays, remindertime },
      { new: true }
    );
    if (user) {
      return res.send("Reminder information successfully updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("There was an error.");
  }
});
