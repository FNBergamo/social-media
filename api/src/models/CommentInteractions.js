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
})

const CommentInteractionModel = mongoose.model(
  "CommentInteraction",
  commentInteractionSchema
)

module.exports = CommentInteractionModel
