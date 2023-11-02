const mongoose = require("mongoose")

const Schema = mongoose.Schema

const interactionSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
  },
})

const InteractionModel = mongoose.model("Interaction", interactionSchema)

module.exports = InteractionModel
