const CommentService = require("../services/CommentService")

async function getAllComments(req, res) {
  const { status, data } = await CommentService.getAllComments()
  return res.status(status).json(data)
}

async function getCommentById(req, res) {
  const { id } = req.params
  const { status, data } = await CommentService.getCommentById(id)
  return res.status(status).json(data)
}

async function createComment(req, res) {
  const { text, tags, userId, postId } = req.body
  const { status, data } = await CommentService.createComment(
    text,
    tags,
    userId,
    postId
  )
  return res.status(status).json(data)
}

async function updateComment(req, res) {
  const { tags } = req.body
  const { id } = req.params
  const { status, data } = await CommentService.updateComment(tags, id)
  return res.status(status).json(data)
}

async function deleteComment(req, res) {
  const { id } = req.params
  const { status, data } = await CommentService.deleteComment(id)
  return res.status(status).json(data)
}

async function deleteComment(req, res) {
  const { id } = req.params
  const { status, data } = await CommentService.deleteComment(id)
  return res.status(status).json(data)
}

async function setCommentInteraction(req, res) {
  const { userId, commentId, interactionType } = req.body
  const { status, data } = await CommentService.setCommentInteraction(
    userId,
    commentId,
    interactionType
  )
  return res.status(status).json(data)
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  setCommentInteraction,
}
