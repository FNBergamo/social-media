const express = require("express")
const {
  sendRequest,
  getAllRequests,
  getAllUserRequests,
  undoFriendship,
  blockOrUnblockUser,
  acceptOrDenyRequest,
} = require("../controllers/FriendshipController")
const router = express.Router()

router.get("/", getAllRequests)
router.get("/:id", getAllUserRequests)
router.post("/:id", sendRequest)
router.put("/:id", acceptOrDenyRequest)
router.delete("/", undoFriendship)
router.delete("/blocked", blockOrUnblockUser)

module.exports = router
