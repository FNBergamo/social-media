const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function getAllUsers() {
  try {
    const users = await User.find()

    if (!users.length) {
      return {
        status: 404,
        data: { message: "Nenhum usuário cadastrado" },
      }
    }

    return { status: 200, data: { users } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findById(userId)

    if (!user) {
      return {
        status: 404,
        data: { message: "Usuário não encontrado" },
      }
    }
    return { status: 200, data: { user } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function signup(
  name,
  email,
  password,
  username,
  profilePicture,
  birthDate
) {
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return {
        status: 400,
        data: { message: "Já existe um usuário cadastrado com este email" },
      }
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

    if (!user) {
      return {
        status: 400,
        data: { message: "Não foi possível cadastrar o usuário" },
      }
    }
    await user.save()
    return { status: 201, data: { user } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return {
        status: 404,
        data: { message: "Nenhum usuário não encontrado" },
      }
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (isPasswordValid) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      })
      return { status: 200, data: { token, message: "Login bem-sucedido" } }
    } else {
      return {
        status: 400,
        data: { message: "Usuário ou senha inválidos!" },
      }
    }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  signup,
  login,
}
