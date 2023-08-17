import mongoose from "mongoose";

const PlayListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  duration: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  playlist_id: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  image_url: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 200,
  },
  level: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
});

export const Playlist = mongoose.model("Playlist", PlayListSchema);
