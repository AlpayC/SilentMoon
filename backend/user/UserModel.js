import crypto from "crypto";
import e from "express";
import { Schema, model, mongoose } from "mongoose";

const isEmail = (string) => {
  const [name, domainWithTLD, ...rest] = string.split("@");
  if (rest.length || !name || !domainWithTLD) {
    return false;
  }

  const [domain, tld] = domainWithTLD.split(".");
  if (tld.length < 2 || !domain) return false;

  return true;
};

export const userSchema = new Schema({
  name: { type: String, required: [true, "Please specify your name"] },
  lastname: { type: String, required: [true, "Please specify your lastname"] },
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  remindertime: [
    {
      type: String,
      minlength: 2,
      maxlength: 200,
    },
  ],
  reminderdays: [{ type: String }],
  videos: [{ type: mongoose.Types.ObjectId, ref: "Video" }],
  playlists: [{ type: Object }],
  sessions: [{
    date: { type: Date, default: Date.now },
    duration: { type: Number, required: true }, // in minutes
    type: { type: String, enum: ['yoga', 'meditation'], required: true },
    contentId: { type: String }, // video or playlist ID
    contentTitle: { type: String },
    rating: { type: Number, min: 1, max: 5 }, // optional user rating
    mood: { type: String, enum: ['calm', 'focused', 'relaxed', 'energized', 'peaceful'] }, // optional mood after session
    completed: { type: Boolean, default: true }
  }],
  streaks: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastSessionDate: { type: Date }
  },
  totalMinutes: { type: Number, default: 0 },
  joinedDate: { type: Date, default: Date.now },
  salt: { type: String, required: true, select: false },
  hash: { type: String, required: true, select: false },
});

userSchema.methods.setPassword = function (password) {
  //Salt
  this.salt = crypto.randomBytes(64).toString("hex");

  // Password mit salt hashen
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.hash === hash;
};

export const User = model("User", userSchema);

export default User;
