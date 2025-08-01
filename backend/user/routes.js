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

// Session tracking endpoints
userRouter.post("/logsession", dataModificationLimiter, authenticateToken, async (req, res) => {
  try {
    const { _id, duration, type, contentId, contentTitle, rating, mood } = req.body;
    
    if (!_id || !duration || !type) {
      return res.status(400).send("Missing required fields: _id, duration, type");
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create new session
    const newSession = {
      date: new Date(),
      duration: parseInt(duration),
      type,
      contentId,
      contentTitle,
      rating: rating ? parseInt(rating) : undefined,
      mood,
      completed: true
    };

    // Add session to user
    user.sessions.push(newSession);
    
    // Update total minutes
    user.totalMinutes = (user.totalMinutes || 0) + parseInt(duration);

    // Update streaks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastSessionDate = user.streaks?.lastSessionDate ? new Date(user.streaks.lastSessionDate) : null;
    
    if (lastSessionDate) {
      lastSessionDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - lastSessionDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day
        user.streaks.current = (user.streaks.current || 0) + 1;
      } else if (daysDiff > 1) {
        // Streak broken, start over
        user.streaks.current = 1;
      }
      // Same day (daysDiff === 0), don't increment streak
    } else {
      // First session ever
      user.streaks = { current: 1, longest: 0 };
    }

    // Update longest streak if needed
    if (user.streaks.current > (user.streaks.longest || 0)) {
      user.streaks.longest = user.streaks.current;
    }

    user.streaks.lastSessionDate = new Date();

    await user.save();
    
    res.status(201).send({
      message: "Session logged successfully",
      session: newSession,
      totalMinutes: user.totalMinutes,
      currentStreak: user.streaks.current
    });

  } catch (err) {
    console.log("Error logging session:", err);
    res.status(500).send("There was an error logging the session.");
  }
});

userRouter.get("/analytics/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Calculate analytics
    const sessions = user.sessions || [];
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const weekSessions = sessions.filter(s => new Date(s.date) >= weekAgo);
    const monthSessions = sessions.filter(s => new Date(s.date) >= monthAgo);

    const analytics = {
      totalSessions: sessions.length,
      totalMinutes: user.totalMinutes || 0,
      currentStreak: user.streaks?.current || 0,
      longestStreak: user.streaks?.longest || 0,
      weekStats: {
        sessions: weekSessions.length,
        minutes: weekSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
      },
      monthStats: {
        sessions: monthSessions.length,
        minutes: monthSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
      },
      averageSessionLength: sessions.length > 0 
        ? Math.round((user.totalMinutes || 0) / sessions.length) 
        : 0,
      favoriteType: sessions.length > 0 
        ? sessions.reduce((acc, s) => {
            acc[s.type] = (acc[s.type] || 0) + 1;
            return acc;
          }, {})
        : {},
      recentSessions: sessions.slice(-10).reverse(),
      joinedDate: user.joinedDate
    };

    res.send(analytics);

  } catch (err) {
    console.log("Error fetching analytics:", err);
    res.status(500).send("There was an error fetching analytics.");
  }
});

userRouter.get("/stats/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).send("User not found");
    }

    const stats = {
      totalMinutes: user.totalMinutes || 0,
      totalSessions: user.sessions?.length || 0,
      currentStreak: user.streaks?.current || 0,
      longestStreak: user.streaks?.longest || 0,
      favorites: user.videos?.length || 0,
      playlists: user.playlists?.length || 0
    };

    res.send(stats);

  } catch (err) {
    console.log("Error fetching stats:", err);
    res.status(500).send("There was an error fetching stats.");
  }
});
