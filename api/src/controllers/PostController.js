const { INTERACTION_TYPE } = require("../constants/Interaction")
const Post = require("../models/Post")
const User = require("../models/User")

const getAllPosts = async (req, res) => {
  let posts

  try {
    posts = await Post.find()
  } catch (err) {
    console.log(err)
  }

  if (!posts) {
    return res
      .status(404)
      .json({ message: "Nenhum registro de post encontrado" })
  }
  return res.status(200).json({ posts })
}

const createPost = async (req, res) => {
  const { title, image, tags, userId, communityId, private } = req.body

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
    creation_date: new Date(),
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

const getPostById = async (req, res) => {
  const postId = req.params.id

  let post

  try {
    post = await Post.findById(postId)
  } catch (err) {
    console.log(err)
  }

  if (!post) {
    return res.status(404).json({ message: "Post não encontrado" })
  }

  return res.status(200).json({ post })
}

const setPostInteraction = async (req, res) => {
  const { userId, postId, interactionType } = req.body

  let post
  let user
  let newInteractionList = []

  try {
    post = await Post.findById(postId)
  } catch (err) {
    console.log(err)
  }

  if (!post) {
    return res.status(404).json({ message: "Post não encontrado" })
  }

  try {
    user = await User.findById(userId)
  } catch (err) {
    console.log(err)
  }

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" })
  }

  const userInteraction = post.interactions.find((interaction) => {
    return interaction.userId === userId
  })

  if (userInteraction) {
    if (userInteraction.type !== interactionType) {
      // renomear lista sem a interação do usuário
      newInteractionList = post.interactions.filter(
        (interaction) => interaction.userId !== userId
      )
      newInteractionList = [
        ...newInteractionList,
        { userId, type: interactionType },
      ]
    } else {
      // renomear lista sem a interação do usuário
      newInteractionList = post.interactions.filter((interaction) => {
        return interaction.userId !== userId
      })
    }
  } else {
    newInteractionList = [
      ...newInteractionList,
      { userId, type: interactionType },
    ]
  }

  const likes = newInteractionList.reduce((result, interaction) => {
    if (interaction.type === INTERACTION_TYPE.UPVOTE) {
      result++
    } else if (interaction.type === INTERACTION_TYPE.DOWNVOTE) {
      result--
    }
    return result
  }, 0)

  try {
    post = await Post.findByIdAndUpdate(postId, {
      interactions: newInteractionList,
      likes,
    })
  } catch (err) {
    console.log(err)
  }

  return res.sendStatus(200)
}

const deletePost = async (req, res) => {
  const postId = req.params.id

  let post

  try {
    post = await Post.findByIdAndRemove(postId)
  } catch (err) {
    console.log(err)
  }

  if (!post) {
    return res.status(500).json({ message: "Não foi possivel excluir o post" })
  }

  return res.sendStatus(200)
}

const teste = async (req, res) => {
  const postId = req.params.id

  try {
    const post = await Post.findById(postId)
      .populate({ path: "user", select: "name username profilePicture" })
      .exec()
    return res.status(200).json({ post })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  getPostById,
  setPostInteraction,
  deletePost,
  teste,
}
