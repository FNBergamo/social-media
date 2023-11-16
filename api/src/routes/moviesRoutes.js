const express = require("express")
const axios = require("axios")
const router = express.Router()
const API_KEY = process.env.API_KEY

router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          page: req.query.page || 1,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: "An error occurred" })
  }
})

module.exports = router
