import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
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
  title_url: {
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
});

export const Music = mongoose.model("Music", MusicSchema);
