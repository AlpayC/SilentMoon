import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },

  level: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },

  duration: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  secure_url: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  image_url: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
});

export const Video = mongoose.model("Video", postsSchema);
