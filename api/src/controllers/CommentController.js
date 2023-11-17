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

    post.comments = [...post.comments, comment._id]
    post.save()
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
    const comment = await Comment.findById(commentId)
    const post = await Post.findById(comment.post)

    await Comment.findByIdAndDelete(commentId)
    post.comments = post.comments.filter(
      (comment) => comment.toString() !== commentId
    )
    post.save()
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

const setCommentInteraction = async (req, res) => {
  const { userId, commentId, interactionType } = req.body

  let updatedInteractions = []

  try {
    const comment = await Comment.findById(commentId)

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    const userInteraction = await CommentInteractions.findOne({ user: userId })

    if (userInteraction) {
      if (userInteraction.type !== interactionType) {
        await CommentInteractions.findByIdAndUpdate(userInteraction._id, {
          type: interactionType,
        })
        updatedInteractions = comment.interactions
      } else {
        updatedInteractions = comment.interactions.filter(
          (interaction) =>
            interaction.toString() !== userInteraction._id.toString()
        )

        await CommentInteractions.findByIdAndDelete(userInteraction._id)
      }
    } else {
      const newInteraction = new CommentInteractions({
        user: userId,
        type: interactionType,
      })
      await newInteraction.save()

      updatedInteractions = [...comment.interactions, newInteraction._id]
    }

    const interactions = await CommentInteractions.find()
    const likes = interactions.reduce((result, interaction) => {
      if (interaction.type === INTERACTION_TYPE.UPVOTE) {
        result++
      } else if (interaction.type === INTERACTION_TYPE.DOWNVOTE) {
        result--
      }
      return result
    }, 0)

    const response = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { interactions: updatedInteractions, likes } },
      { new: true }
    )
    return res.status(200).json({ response })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro Interno" })
  }
}

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  getCommentById,
  deleteComment,
  setCommentInteraction,
}
