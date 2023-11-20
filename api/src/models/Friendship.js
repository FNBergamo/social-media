const mongoose = require("mongoose")
const { FRIENDSHIP_STATUS } = require("../constants/FriendshipStatus")

const Schema = mongoose.Schema

const friendshipSchema = new Schema({
  senderUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestedUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
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

friendshipSchema.index({ senderUser: 1, requestedUser: 1 }, { unique: true })

const FriendshipModel = mongoose.model("Friendship", friendshipSchema)

module.exports = FriendshipModel
