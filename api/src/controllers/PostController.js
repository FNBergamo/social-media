const { INTERACTION_TYPE } = require("../constants/Interaction")
const Post = require("../models/Post")
const User = require("../models/User")
const PostInteractions = require("../models/PostInteractions")

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10

    const totalPosts = await Post.countDocuments()
    const totalPages = Math.ceil(totalPosts / perPage)

    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "user", select: "name username profilePicture" })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name username profilePicture",
        },
      })
      .exec()

    if (!posts.length) {
      return res
        .status(404)
        .json({ message: "Nenhum registro de post encontrado" })
    }
    return res.status(200).json({ posts, totalPages, currentPage: page })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const getAllPublicPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10

    const totalPosts = await Post.countDocuments()
    const totalPages = Math.ceil(totalPosts / perPage)

    const posts = await Post.find({ private: false, hidden: false })
      .sort({
        created_at: -1,
      })
      .skip((page - 1) * perPage)
      .limit(perPage)

    if (!posts.length) {
      return res
        .status(404)
        .json({ message: "Nenhum registro de post encontrado" })
    }
    return res.status(200).json({ posts, totalPages, currentPage: page })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const createPost = async (req, res) => {
  const { title, image, tags, userId, communityId, private, hidden } = req.body

  let user

  try {
    user = await User.findById(userId)
  } catch (err) {
    console.log(err)
  }

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" })
  }

  const post = new Post({
    title,
    image,
    tags,
    user: userId,
    community: communityId,
    created_at: new Date(),
    private,
    hidden,
  })

  try {
    post.save()
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
  return res.status(201).json({ post })
}

const updatePost = async (req, res) => {
  const { tags, private, hidden } = req.body
  const postId = req.params.id

  let post

  try {
    post = await Post.findByIdAndUpdate(postId, {
      tags,
      private,
      hidden,
    })
  } catch (err) {
    console.log(err)
  }

  if (!post) {
    return res
      .status(500)
      .json({ message: "Não foi possível atualizar o post" })
  }

  return res.sendStatus(200)
}

const setPostInteraction = async (req, res) => {
  const { userId, postId, interactionType } = req.body

  let updatedInteractions = []

  try {
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    const userInteraction = await PostInteractions.findOne({ user: userId })

    if (userInteraction) {
      if (userInteraction.type !== interactionType) {
        await PostInteractions.findByIdAndUpdate(userInteraction._id, {
          type: interactionType,
        })
        updatedInteractions = post.interactions
      } else {
        updatedInteractions = post.interactions.filter(
          (interaction) =>
            interaction.toString() !== userInteraction._id.toString()
        )

        await PostInteractions.findByIdAndDelete(userInteraction._id)
      }
    } else {
      const newInteraction = new PostInteractions({
        user: userId,
        type: interactionType,
      })
      await newInteraction.save()

      updatedInteractions = [...post.interactions, newInteraction._id]
    }

    const interactions = await PostInteractions.find()
    const likes = interactions.reduce((result, interaction) => {
      if (interaction.type === INTERACTION_TYPE.UPVOTE) {
        result++
      } else if (interaction.type === INTERACTION_TYPE.DOWNVOTE) {
        result--
      }
      return result
    }, 0)

    const response = await Post.findByIdAndUpdate(
      postId,
      { $set: { interactions: updatedInteractions, likes } },
      { new: true }
    )
    return res.status(200).json({ response })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro Interno" })
  }
}

const deletePost = async (req, res) => {
  const postId = req.params.id

  let post

  try {
    post = await Post.findByIdAndDelete(postId)
  } catch (err) {
    console.log(err)
  }

  if (!post) {
    return res.status(500).json({ message: "Não foi possivel excluir o post" })
  }

  return res.sendStatus(200)
}

const getPostById = async (req, res) => {
  const postId = req.params.id

  try {
    const post = await Post.findById(postId)
      .populate({ path: "user", select: "name username profilePicture" })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name username profilePicture",
        },
      })
      .exec()
    return res.status(200).json({ post })
  } catch (err) {
    console.error(err)
  }
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
