require("dotenv").config()
require("./db")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const productRoutes = require("./routes/moviesRoutes")

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/movies", productRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
