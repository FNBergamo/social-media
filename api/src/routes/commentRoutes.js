const express = require("express")
const {
  getAllComments,
  createComment,
  updateComment,
  getCommentById,
  deleteComment,
} = require("../controllers/CommentController")
const router = express.Router()

router.get("/", getAllComments)
router.get("/:id", getCommentById)
router.post("/create", createComment)
router.put("/:id", updateComment)
router.delete("/:id", deleteComment)

module.exports = router
