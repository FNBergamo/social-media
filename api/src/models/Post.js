const mongoose = require("mongoose")
const { interactionSchema } = require("./PostInteractions")

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  comments: {
    type: Array,
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
})

const PostModel = mongoose.model("Post", postSchema)

module.exports = PostModel
