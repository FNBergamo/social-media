const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postInteractionSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
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

const PostInteractionModel = mongoose.model(
  "PostInteraction",
  postInteractionSchema
)

module.exports = PostInteractionModel
