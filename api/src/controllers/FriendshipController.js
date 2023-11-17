const User = require("../models/User")
const Friendship = require("../models/Friendship")
const { FRIENDSHIP_STATUS } = require("../constants/FriendshipStatus")

const getAllRequests = async (req, res) => {
  try {
    const friendships = await Friendship.find()

    if (!friendships.length) {
      return res.status(404).json({ message: "Nenhuma solicitação encontrada" })
    }

    return res.status(200).json({ friendships })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const getAllUserRequests = async (req, res) => {
  const userId = req.params.id
  const status = req.query.status || FRIENDSHIP_STATUS.WAITING
  console.log(status)

  try {
    // const friendships = await Friendship.find({
    //   $or: [{ senderUser: userId }, { requestedUser: userId }],
    // })

    const requestSended = await Friendship.find({
      senderUser: userId,
      status,
    })
    const requestRecived = await Friendship.find({
      requestedUser: userId,
      status,
    })

    return res.status(200).json({ requestSended, requestRecived })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const sendRequest = async (req, res) => {
  const requestedId = req.params.id
  const { senderId } = req.body

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
    }

    const newFriendshipRequest = new Friendship({
      senderUser: senderId,
      requestedUser: requestedId,
      creation_date: new Date(),
      status: FRIENDSHIP_STATUS.WAITING,
    })

    newFriendshipRequest.save()
    return res.sendStatus(201)
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Não foi possível enviar a solicitação" })
  }
}

const acceptDenyOrBlockRequest = async (req, res) => {
  const friendshipId = req.params.id
  const { status } = req.body

  try {
    if (status === FRIENDSHIP_STATUS.REFUSED) {
      await Friendship.findByIdAndDelete(friendshipId)
      return res
        .status(200)
        .json({ message: "Solicitação de amizade recusada" })
    }

    const updatedFriendship = await Friendship.findByIdAndUpdate(
      friendshipId,
      { status },
      { new: true }
    )

    if (!updatedFriendship) {
      return res
        .status(500)
        .json({ message: "Não foi possível efetuar a requisição" })
    }

    if (updatedFriendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
      return res.status(200).json({ message: "Solicitação de amizade aceita" })
    } else {
      return res.status(200).json({ message: "Usuário bloqueado" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const undoFriendship = async (req, res) => {
  const friendshipId = req.params.id

  try {
    const friendship = await Friendship.findById(friendshipId)

    if (friendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
      await Friendship.findByIdAndDelete(friendshipId)
      return res.status(200).json({ message: "Amizade desfeita" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const blockOrUnblockUser = async (req, res) => {
  const friendshipId = req.params.id

  try {
    await Friendship.findByIdAndDelete(friendshipId)
    return res.status(200).json({ message: "Usuário não mais bloquedo" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

module.exports = {
  sendRequest,
  acceptDenyOrBlockRequest,
  blockOrUnblockUser,
  undoFriendship,
  getAllRequests,
  getAllUserRequests,
}
