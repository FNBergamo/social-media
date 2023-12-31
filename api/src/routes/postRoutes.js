const express = require("express")
const {
  getAllPosts,
  createPost,
  updatePost,
  getPostById,
  setPostInteraction,
  deletePost,
} = require("../controllers/PostController")
const router = express.Router()

router.get("/", getAllPosts)
router.get("/:id", getPostById)
router.post("/create", createPost)
router.put("/:id", updatePost)
router.put("/", setPostInteraction)
router.delete("/:id", deletePost)

module.exports = router
