const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const {
  getAllUsers,
  signup,
  login,
  getUserById,
} = require("../controllers/UserController")

const secretKey = "mysecretkey"

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/signup", signup)
router.post("/login", login)

router.get("/protected", (req, res) => {
  const token = req.header("Authorization")

  if (!token) {
    return res.status(401).json({ error: "Token de autenticação ausente" })
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    res
      .status(200)
      .json({ message: "Rota protegida acessada", user: decoded.username })
  } catch (error) {
    res.status(401).json({ error: "Token de autenticação inválido" })
  }
})

module.exports = router
