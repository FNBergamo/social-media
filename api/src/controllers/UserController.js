const UserService = require("../services/UserService")

const getAllUsers = async (req, res) => {
  const { status, data } = await UserService.getAllUsers()
  return res.status(status).json(data)
}

const getUserById = async (req, res) => {
  const { id } = req.params

  const { status, data } = await UserService.getUserById(id)
  return res.status(status).json(data)
}

const signup = async (req, res) => {
  const { name, email, password, username, profilePicture, birthDate } =
    req.body

  const { status, data } = await UserService.signup(
    name,
    email,
    password,
    username,
    profilePicture,
    birthDate
  )
  return res.status(status).json(data)
}

const login = async (req, res) => {
  const { email, password } = req.body

  const { status, data } = await UserService.login(email, password)
  return res.status(status).json(data)
}

module.exports = {
  getAllUsers,
  getUserById,
  signup,
  login,
}
