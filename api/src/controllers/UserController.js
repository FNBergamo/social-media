const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllUsers = async (req, res) => {
  let users

  try {
    users = await User.find()
  } catch (err) {
    console.log(err)
  }

  if (!users) {
    return res.status(404).json({ message: "Nenhum usuário cadastrado" })
  }
  return res.status(200).json({ users })
}

const getUserById = async (req, res) => {
  const userId = req.params.id

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    console.log(err)
  }

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" })
  }
  return res.status(200).json({ user })
}

const signup = async (req, res) => {
  const { name, email, password, username, profilePicture, birthDate } =
    req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    console.log(err)
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Já existe um usuário cadastrado com este email" })
  }

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({
    name,
    email,
    password: hashedPassword,
    username,
    profilePicture,
    birthDate,
  })

  try {
    await user.save()
  } catch (err) {
    console.log(err)
  }
  return res.status(201).json({ user })
}

const login = async (req, res) => {
  const { email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    console.log(err)
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Usuário não encontrado" })
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password)
  if (isPasswordValid) {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    })
    res.status(200).json({ token, message: "Login bem-sucedido" })
  } else {
    res.status(400).json({ error: "Usuário ou senha inválidos!" })
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  signup,
  login,
}
