const mongoose = require("mongoose")
const { FRIENDSHIP_STATUS } = require("../constants/FriendshipStatus")

const Schema = mongoose.Schema

const friendshipSchema = new Schema({
  senderUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  requestedUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  creation_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

const FriendshipModel = mongoose.model("Friendship", friendshipSchema)

module.exports = FriendshipModel
