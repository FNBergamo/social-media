const express = require("express")
const {
  getAllComments,
  createComment,
  updateComment,
  getCommentById,
  deleteComment,
  setCommentInteraction,
} = require("../controllers/CommentController")
const router = express.Router()

router.get("/", getAllComments)
router.get("/:id", getCommentById)
router.post("/create", createComment)
router.put("/:id", updateComment)
router.delete("/:id", deleteComment)
router.put("/", setCommentInteraction)

module.exports = router
