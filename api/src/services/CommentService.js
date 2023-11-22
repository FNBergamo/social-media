const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")
const CommentInteractions = require("../models/CommentInteractions")
const { INTERACTION_TYPE } = require("../constants/Interaction")

async function getAllComments() {
  try {
    const comments = await Comment.find()

    if (!comments.length) {
      return { status: 404, data: { message: "Nenhum comentário encontrado" } }
    }

    return { status: 200, data: { comments } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function getCommentById(commentId) {
  try {
    const comment = await Comment.findById(commentId)
      .populate({ path: "user", select: "name username profilePicture" })
      .exec()

    if (!comment) {
      return { status: 404, data: { message: "Comentário não encontrado" } }
    }

    return { status: 200, data: { comment } }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Erro interno" },
    }
  }
}

async function createComment(text, tags, userId, postId) {
  try {
    const post = await Post.findById(postId)

    if (!post) {
      return { status: 404, data: { message: "Post não encontrado" } }
    }

    const user = await User.findById(userId)

    if (!user) {
      return { status: 404, data: { message: "Usuário não encontrado" } }
    }

    const comment = new Comment({
      text,
      tags,
      user: userId,
      post: postId,
    })
    await comment.save()

    post.comments.push(comment._id)
    await post.save()

    return { status: 201, data: { comment } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function updateComment(tags, commentId) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        tags,
        modified_at: new Date(),
      },
      { new: true }
    )

    if (!updatedComment) {
      return {
        status: 404,
        data: { message: "Comentário não encontrado" },
      }
    }

    return { status: 200, data: updatedComment }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Não foi possível atualizar o comentário" },
    }
  }
}

async function deleteComment(commentId) {
  try {
    const comment = await Comment.findById(commentId)

    if (!comment) {
      return { status: 404, data: { message: "Comentário não encontrado" } }
    }

    const post = await Post.findById(comment.post)

    if (!post) {
      return { status: 404, data: { message: "Post não encontrado" } }
    }

    await Comment.findByIdAndDelete(commentId)
    post.comments = post.comments.filter(
      (comment) => comment.toString() !== commentId
    )
    await post.save()
    return { status: 200, data: { message: "Comentário excluído com sucesso" } }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Não foi possível excluir o comentário" },
    }
  }
}

async function setCommentInteraction(userId, commentId, interactionType) {
  try {
    const comment = await Comment.findById(commentId)

    if (!comment) {
      return { status: 404, data: { message: "Comentário não encontrado" } }
    }

    const user = await User.findById(userId)

    if (!user) {
      return { status: 404, data: { message: "Usuário não encontrado" } }
    }

    const userInteraction = await CommentInteractions.findOne({ user: userId })

    let updatedInteractions = []

    if (userInteraction) {
      if (userInteraction.type !== interactionType) {
        await CommentInteractions.findByIdAndUpdate(userInteraction._id, {
          type: interactionType,
          modified_at: new Date(),
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

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: {
          interactions: updatedInteractions,
          likes,
          modified_at: new Date(),
        },
      },
      { new: true }
    )

    return { status: 200, data: { updatedComment } }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Erro interno" },
    }
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  setCommentInteraction,
}
