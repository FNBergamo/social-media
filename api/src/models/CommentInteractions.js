const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentInteractionSchema = new Schema({
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
    default: new Date(),
  },
  modified_at: {
    type: Date,
  },
})

const CommentInteractionModel = mongoose.model(
  "CommentInteraction",
  commentInteractionSchema
)

module.exports = CommentInteractionModel
