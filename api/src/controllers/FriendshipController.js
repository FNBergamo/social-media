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

  try {
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
      status: FRIENDSHIP_STATUS.WAITING,
    })

    newFriendshipRequest.save()
    return res.status(201).json({ newFriendshipRequest })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Não foi possível enviar a solicitação" })
  }
}

const acceptOrDenyRequest = async (req, res) => {
  const friendshipId = req.params.id
  const { userId, status } = req.body

  try {
    if (status === FRIENDSHIP_STATUS.REFUSED) {
      await Friendship.findByIdAndDelete(friendshipId)
      return res
        .status(200)
        .json({ message: "Solicitação de amizade recusada" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    const updatedFriendship = await Friendship.findByIdAndUpdate(
      friendshipId,
      { status, modified_at: new Date() },
      { new: true }
    )

    if (!updatedFriendship) {
      return res
        .status(500)
        .json({ message: "Não foi possível efetuar a requisição" })
    }

    if (updatedFriendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
      if (updatedFriendship.requestedUser.toString() === userId) {
        const senderUser = await User.findById(updatedFriendship.senderUser)
        senderUser.friends = [
          ...senderUser.friends,
          updatedFriendship.requestedUser,
        ]
        user.friends = [...user.friends, updatedFriendship.senderUser]
        user.save()
        senderUser.save()
      } else {
        return res
          .status(400)
          .json({ message: "Você não pode aceitar sua prórpia requisição" })
      }
      return res.status(200).json({ message: "Solicitação de amizade aceita" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const undoFriendship = async (req, res) => {
  const { sender, requester } = req.body

  try {
    const friendship = await Friendship.findOne({
      $or: [
        {
          senderUser: { $in: [sender, requester] },
          requestedUser: { $in: [sender, requester] },
        },
      ],
    })

    const senderUser = await User.findById(sender)
    const requestedUser = await User.findById(requester)

    if (friendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
      await Friendship.findByIdAndDelete(friendship._id)

      senderUser.friends = senderUser.friends.filter(
        (friend) => friend.toString() != friendship.requestedUser.toString()
      )

      requestedUser.friends = requestedUser.friends.filter(
        (friend) => friend.toString() != friendship.senderUser.toString()
      )

      senderUser.save()
      requestedUser.save()

      return res.status(200).json({ message: "Amizade desfeita" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

const blockOrUnblockUser = async (req, res) => {
  const { sender, blocked } = req.body

  try {
    const friendship = await Friendship.findOne({
      senderUser: sender,
      requestedUser: blocked,
      status: FRIENDSHIP_STATUS.BLOCKED,
    })
    const user = await User.findById(sender)

    if (friendship) {
      await Friendship.findByIdAndDelete(friendship._id)
      user.blockedUsers = user.blockedUsers.filter((friend) => {
        return friend.toString() !== blocked
      })

      user.save()
    } else {
      const newFriendshipRequest = new Friendship({
        senderUser: sender,
        requestedUser: blocked,
        status: FRIENDSHIP_STATUS.BLOCKED,
      })
      newFriendshipRequest.save()

      user.blockedUsers = [...user.blockedUsers, blocked]
      user.save()

      return res.status(200).json({ message: "Usuário bloqueado" })
    }

    return res.status(200).json({ message: "Usuário não mais bloqueado" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno" })
  }
}

module.exports = {
  sendRequest,
  acceptOrDenyRequest,
  blockOrUnblockUser,
  undoFriendship,
  getAllRequests,
  getAllUserRequests,
}
