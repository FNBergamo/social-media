const express = require("express")
const axios = require("axios")
const router = express.Router()
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTM1NzJmMDg1MTQ0NzI2NDEzMTI5YjIxYWVkOWJlZSIsInN1YiI6IjY0ZDMyNzE1ZGI0ZWQ2MDBhZDIzN2ZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dvdT4xvjtFl48QB3hc9rllsO8CxnsGvWj2B0d6Wy9ZA"

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
