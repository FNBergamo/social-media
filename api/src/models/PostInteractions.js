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
})

const PostInteractionModel = mongoose.model(
  "PostInteraction",
  postInteractionSchema
)

module.exports = PostInteractionModel
