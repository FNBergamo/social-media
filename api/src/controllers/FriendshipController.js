const FriendshipService = require("../services/FriendshipService")

const getAllRequests = async (req, res) => {
  const { status, data } = await FriendshipService.getAllRequests()
  return res.status(status).json(data)
}

const getAllUserRequests = async (req, res) => {
  const userId = req.params.id
  const friendshipStatus = req.query.status
  const { status, data } = await FriendshipService.getAllUserRequests(
    userId,
    friendshipStatus
  )
  return res.status(status).json(data)
}

const sendRequest = async (req, res) => {
  const requestedId = req.params.id
  const { senderId } = req.body
  const { status, data } = await FriendshipService.sendFriendshipRequest(
    requestedId,
    senderId
  )
  return res.status(status).json(data)
}

const acceptOrDenyRequest = async (req, res) => {
  const friendshipId = req.params.id
  const { userId, friendshipStatus } = req.body
  const { status, data } =
    await FriendshipService.acceptOrDenyFriendshipRequest(
      friendshipId,
      userId,
      friendshipStatus
    )
  return res.status(status).json(data)
}

const undoFriendship = async (req, res) => {
  const { sender, requester } = req.body
  const { status, data } = await FriendshipService.undoFriendship(
    sender,
    requester
  )
  return res.status(status).json(data)
}

const blockOrUnblockUser = async (req, res) => {
  const { sender, blocked } = req.body
  const { status, data } = await FriendshipService.blockOrUnblockUser(
    sender,
    blocked
  )
  return res.status(status).json(data)
}

module.exports = {
  sendRequest,
  acceptOrDenyRequest,
  blockOrUnblockUser,
  undoFriendship,
  getAllRequests,
  getAllUserRequests,
}
