const { INTERACTION_TYPE } = require("../constants/Interaction")
const Post = require("../models/Post")
const User = require("../models/User")
const PostInteractions = require("../models/PostInteractions")

async function getAllPosts(page = 1, perPage = 10) {
  try {
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
      return {
        status: 404,
        data: { message: "Nenhum registro de post encontrado" },
      }
    }

    return { status: 200, data: { posts, totalPages, currentPage: page } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function getAllPublicPosts(page = 1, perPage = 10) {
  try {
    const totalPosts = await Post.countDocuments()
    const totalPages = Math.ceil(totalPosts / perPage)

    const posts = await Post.find({ private: false, hidden: false })
      .sort({
        created_at: -1,
      })
      .skip((page - 1) * perPage)
      .limit(perPage)

    if (!posts.length) {
      return {
        status: 404,
        data: { message: "Nenhum registro de post encontrado" },
      }
    }
    return { status: 200, data: { posts, totalPages, currentPage: page } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function createPost(
  title,
  image,
  tags,
  userId,
  communityId,
  private,
  hidden
) {
  try {
    const user = await User.findById(userId)
    if (!user) {
      return {
        status: 404,
        data: { message: "Usuário não encontrado" },
      }
    }

    const post = new Post({
      title,
      image,
      tags,
      user: userId,
      community: communityId,
      private,
      hidden,
    })

    if (!post) {
      return {
        status: 400,
        data: { message: "Não foi possível criar o post" },
      }
    }

    post.save()
    return { status: 201, data: { post } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function updatePost(postId, tags, private, hidden) {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        tags,
        private,
        hidden,
        modified_at: new Date(),
      },
      { new: true }
    )

    if (!post) {
      return {
        status: 400,
        data: { message: "Não foi possível atualizar o post" },
      }
    }
    return { status: 200, data: { post } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function setPostInteraction(userId, postId, interactionType) {
  try {
    let updatedInteractions = []

    const post = await Post.findById(postId)

    if (!post) {
      return {
        status: 404,
        data: { message: "Post não encontrado" },
      }
    }

    const user = await User.findById(userId)

    if (!user) {
      return {
        status: 404,
        data: { message: "Usuário não encontrado" },
      }
    }

    const userInteraction = await PostInteractions.findOne({ user: userId })

    if (userInteraction) {
      if (userInteraction.type !== interactionType) {
        const interaction = await PostInteractions.findByIdAndUpdate(
          userInteraction._id,
          {
            type: interactionType,
            modified_at: new Date(),
          }
        )
        if (!interaction) {
          return {
            status: 400,
            data: { message: "INão foi possível atualizar a interação" },
          }
        }
        updatedInteractions = post.interactions
      } else {
        updatedInteractions = post.interactions.filter(
          (interaction) =>
            interaction.toString() !== userInteraction._id.toString()
        )

        const interaction = await PostInteractions.findByIdAndDelete(
          userInteraction._id
        )

        if (!interaction) {
          return {
            status: 400,
            data: { message: "Não foi possível remover a interação" },
          }
        }
      }
    } else {
      const newInteraction = new PostInteractions({
        user: userId,
        type: interactionType,
      })
      if (!newInteraction) {
        return {
          status: 400,
          data: { message: "Não foi possível criar interação" },
        }
      }
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
      {
        $set: {
          interactions: updatedInteractions,
          likes,
          modified_at: new Date(),
        },
      },
      { new: true }
    )
    return { status: 200, data: response }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function deletePost(postId) {
  try {
    const post = await Post.findByIdAndDelete(postId)
    if (!post) {
      return {
        status: 400,
        data: { message: "Não foi possível excluir o post" },
      }
    }

    return { status: 200, data: { message: "Post excluído" } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function getPostById(postId) {
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

    if (!post) {
      return {
        status: 404,
        data: { message: "Nenhum post encontrado" },
      }
    }

    return { status: 200, data: { post } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
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
