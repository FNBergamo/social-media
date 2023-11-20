const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  friends: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  blockedUsers: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel
