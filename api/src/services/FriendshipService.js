const User = require("../models/User")
const Friendship = require("../models/Friendship")
const { FRIENDSHIP_STATUS } = require("../constants/FriendshipStatus")

async function getAllRequests() {
  try {
    const friendships = await Friendship.find()

    if (!friendships.length) {
      return {
        status: 404,
        data: { message: "Nenhuma solicitação encontrada" },
      }
    }

    return { status: 200, data: { friendships } }
  } catch (err) {
    return { status: 500, data: { message: "Erro interno" } }
  }
}

async function getAllUserRequests(userId, status = FRIENDSHIP_STATUS.WAITING) {
  try {
    const requestSended = await Friendship.find({
      senderUser: userId,
      status,
    })

    const requestRecived = await Friendship.find({
      requestedUser: userId,
      status,
    })

    return { status: 200, data: { requestSended, requestRecived } }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Erro interno" },
    }
  }
}

async function sendFriendshipRequest(requestedId, senderId) {
  try {
    const sender = await User.findById(senderId)
    if (!sender) {
      return {
        status: 404,
        data: { message: "Usuário solicitante não encontrado" },
      }
    }

    const requested = await User.findById(requestedId)
    if (!requested) {
      return {
        status: 404,
        data: { message: "Usuário requisitado não encontrado" },
      }
    }

    const friendship = await Friendship.findOne({
      senderUser: senderId,
      requestedUser: requestedId,
    })

    if (friendship) {
      if (friendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
        return { status: 400, data: { message: "Usuários já são amigos" } }
      }

      if (friendship.status === FRIENDSHIP_STATUS.BLOCKED) {
        return {
          status: 400,
          data: {
            message:
              "Você não pode enviar solicitação de amizade para este usuário",
          },
        }
      }

      if (friendship.status === FRIENDSHIP_STATUS.WAITING) {
        return {
          status: 400,
          data: { message: "Solicitação já enviada, esperando confirmação" },
        }
      }
    }

    const newFriendshipRequest = new Friendship({
      senderUser: senderId,
      requestedUser: requestedId,
      status: FRIENDSHIP_STATUS.WAITING,
    })

    newFriendshipRequest.save()
    return { status: 201, data: { friendship: newFriendshipRequest } }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Não foi possível enviar a solicitação" },
    }
  }
}

async function acceptOrDenyFriendshipRequest(friendshipId, userId, status) {
  try {
    if (status === FRIENDSHIP_STATUS.REFUSED) {
      const friendship = await Friendship.findByIdAndDelete(friendshipId)
      if (!friendship) {
        return {
          status: 500,
          data: { message: "Não foi possível efetuar a requisição" },
        }
      }

      return {
        status: 200,
        data: { message: "Solicitação de amizade recusada" },
      }
    }

    const user = await User.findById(userId)
    if (!user) {
      return {
        status: 404,
        data: { message: "Usuário não encontrado" },
      }
    }

    const updatedFriendship = await Friendship.findByIdAndUpdate(
      friendshipId,
      { status, modified_at: new Date() },
      { new: true }
    )

    if (!updatedFriendship) {
      return {
        status: 400,
        data: { message: "Não foi possível efetuar a requisição" },
      }
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
        return {
          status: 400,
          data: { message: "Você não pode aceitar sua prórpia requisição" },
        }
      }
      return {
        status: 200,
        data: { message: "Solicitação de amizade aceita" },
      }
    }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Erro interno" },
    }
  }
}

async function undoFriendship(sender, requester) {
  try {
    const friendship = await Friendship.findOne({
      $or: [
        {
          senderUser: { $in: [sender, requester] },
          requestedUser: { $in: [sender, requester] },
        },
      ],
    })
    if (!friendship) {
      return {
        status: 404,
        data: { message: "Amizade não encontrada" },
      }
    }

    const senderUser = await User.findById(sender)
    if (!senderUser) {
      return {
        status: 404,
        data: { message: "Usuário solicitante não encontrado" },
      }
    }
    const requestedUser = await User.findById(requester)
    if (!requestedUser) {
      return {
        status: 404,
        data: { message: "Usuário requisitado não encontrado" },
      }
    }

    if (friendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
      await Friendship.findByIdAndDelete(friendship._id)

      senderUser.friends = senderUser.friends.filter(
        (friend) => friend.toString() !== requestedUser._id.toString()
      )

      requestedUser.friends = requestedUser.friends.filter(
        (friend) => friend.toString() !== senderUser._id.toString()
      )

      senderUser.save()
      requestedUser.save()

      return { status: 200, data: { message: "Amizade desfeita" } }
    }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Erro interno" },
    }
  }
}

async function blockOrUnblockUser(sender, blocked) {
  try {
    const friendship = await Friendship.findOne({
      senderUser: sender,
      requestedUser: blocked,
      status: FRIENDSHIP_STATUS.BLOCKED,
    })

    const user = await User.findById(sender)
    if (!user) {
      return {
        status: 404,
        data: { message: "Usuário solicitante não encontrado" },
      }
    }

    if (friendship) {
      const deletedFriendship = await Friendship.findByIdAndDelete(
        friendship._id
      )
      user.blockedUsers = user.blockedUsers.filter((friend) => {
        return friend.toString() !== blocked
      })

      if (!deletedFriendship) {
        return {
          status: 400,
          data: { message: "Não foi possível efetuar a requisição" },
        }
      }

      user.save()
    } else {
      const newFriendshipRequest = new Friendship({
        senderUser: sender,
        requestedUser: blocked,
        status: FRIENDSHIP_STATUS.BLOCKED,
      })
      if (!newFriendshipRequest) {
        return {
          status: 400,
          data: { message: "Não foi possível efetuar a requisição" },
        }
      }
      newFriendshipRequest.save()

      user.blockedUsers = [...user.blockedUsers, blocked]
      user.save()

      return {
        status: 200,
        data: { message: "Usuário bloqueado" },
      }
    }

    return {
      status: 200,
      data: { message: "Usuário não mais bloqueado" },
    }
  } catch (err) {
    return {
      status: 500,
      data: { message: "Erro interno" },
    }
  }
}

module.exports = {
  sendFriendshipRequest,
  acceptOrDenyFriendshipRequest,
  blockOrUnblockUser,
  undoFriendship,
  getAllRequests,
  getAllUserRequests,
}
