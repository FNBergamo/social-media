const { INTERACTION_TYPE } = require("../constants/Interaction")
const Comment = require("../models/Comment")
const CommentInteractions = require("../models/CommentInteractions")
const User = require("../models/User")
const Post = require("../models/Post")

const getAllComments = async (req, res) => {
  let comments

  try {
    comments = await Comment.find()
  } catch (err) {
    console.log(err)
  }

  if (!comments.length) {
    return res.status(404).json({ message: "Nenhum comentário encontrado" })
  }
  return res.status(200).json({ comments })
}

const createComment = async (req, res) => {
  const { text, tags, userId, postId } = req.body

  try {
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    const comment = new Comment({
      text,
      tags,
      user: userId,
      post: postId,
      creation_date: new Date(),
    })
    comment.save()
    return res.status(201).json({ comment })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro Interno" })
  }
}

const updateComment = async (req, res) => {
  const { tags } = req.body
  const commentId = req.params.id

  try {
    await Comment.findByIdAndUpdate(commentId, {
      tags,
    })
    return res.sendStatus(200)
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Não foi possível atualizar o comentário" })
  }
}

const deleteComment = async (req, res) => {
  const commentId = req.params.id

  try {
    await Comment.findByIdAndDelete(commentId)
    return res.sendStatus(200)
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Não foi possivel excluir o commentário" })
  }
}

const getCommentById = async (req, res) => {
  const commentId = req.params.id

  try {
    const comment = await Comment.findById(commentId)
      .populate({ path: "user", select: "name username profilePicture" })
      .exec()

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" })
    }

    return res.status(200).json({ comment })
  } catch (err) {
    return res.status(500).json({ message: "Erro Interno" })
  }
}

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  getCommentById,
  deleteComment,
}