const User = require("../models/User")
const Friendship = require("../models/Friendship")
const { FRIENDSHIP_STATUS } = require("../constants/FriendshipStatus")

const findFriendshipRequest = async (req, res) => {
  const postId = req.params.id
}

const sendRequest = async (req, res) => {
  const { senderId, requestedId } = req.body

  try {
    const sender = await User.findById(senderId)
    if (!sender) {
      return res
        .status(404)
        .json({ message: "Usuário solicitante não encontrado" })
    }

    const requested = await User.findById(requestedId)

    if (!requested) {
      return res
        .status(404)
        .json({ message: "Usuário requisitado não encontrado" })
    }

    const friendship = await Friendship.findOne({
      senderUser: senderId,
      requestedUser: requestedId,
    })

    if (friendship) {
      if (friendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
        return res.status(400).json({ message: "Usuários já são amigos" })
      }

      if (friendship.status === FRIENDSHIP_STATUS.BLOCKED) {
        return res.status(400).json({
          message:
            "Você não pode enviar solicitação de amizade para este usuário",
        })
      }

      if (friendship.status === FRIENDSHIP_STATUS.WAITING) {
        return res.status(400).json({
          message: "Solicitação já enviada, esperando confirmação",
        })
      }

      const newFriendshipRequest = new Friendship({
        senderUser: senderId,
        requestedUser: requestedId,
        creation_date: new Date(),
      })

      newFriendshipRequest.save()
      return res.sendStatus(201)
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Não foi possível enviar a solicitação" })
  }
}

// const friendship = new Friendship({
//     senderUser: senderId,
//     requestedUser: requestedId,
//     creation_date: new Date(),
//     status,
//   })
const undoFriendship = async (req, res) => {
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

const blockOrUnblockUser = async (req, res) => {
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

const acceptDenyOrBlockRequest = async (req, res) => {
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

module.exports = {
  sendRequest,
  acceptDenyOrBlockRequest,
  blockOrUnblockUser,
  undoFriendship,
}
