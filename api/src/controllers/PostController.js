const PostService = require("../services/PostService")

const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page)
  const perPage = parseInt(req.query.perPage)

  const { status, data } = await PostService.getAllPosts(page, perPage)
  return res.status(status).json(data)
}

const getAllPublicPosts = async (req, res) => {
  const page = parseInt(req.query.page)
  const perPage = parseInt(req.query.perPage)

  const { status, data } = await PostService.getAllPublicPosts(page, perPage)
  return res.status(status).json(data)
}

const createPost = async (req, res) => {
  const { title, image, tags, userId, communityId, private, hidden } = req.body

  const { status, data } = await PostService.createPost(
    title,
    image,
    tags,
    userId,
    communityId,
    private,
    hidden
  )
  return res.status(status).json(data)
}

const updatePost = async (req, res) => {
  const { id } = req.params
  const { tags, private, hidden } = req.body

  const { status, data } = await PostService.updatePost(
    id,
    tags,
    private,
    hidden
  )
  return res.status(status).json(data)
}

const setPostInteraction = async (req, res) => {
  const { userId, postId, interactionType } = req.body

  const { status, data } = await PostService.setPostInteraction(
    userId,
    postId,
    interactionType
  )
  return res.status(status).json(data)
}

const deletePost = async (req, res) => {
  const { id } = req.params

  const { status, data } = await PostService.deletePost(id)
  return res.status(status).json(data)
}

const getPostById = async (req, res) => {
  const { id } = req.params

  const { status, data } = await PostService.getPostById(id)
  return res.status(status).json(data)
}

module.exports = {
  getAllPosts,
  getAllPublicPosts,
  createPost,
  updatePost,
  getPostById,
  setPostInteraction,
  deletePost,
}
