const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
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

const CommentModel = mongoose.model("Comment", commentSchema)

module.exports = CommentModel
