const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    default: [],
  },
  tags: {
    type: Array,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: String,
  },
  private: {
    type: Boolean,
    default: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  interactions: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PostInteraction",
      },
    ],
    default: [],
  },
  created_at: {
    type: Date,
    required: true,
  },
  modified_at: {
    type: Date,
    required: true,
  },
})

const PostModel = mongoose.model("Post", postSchema)

module.exports = PostModel
