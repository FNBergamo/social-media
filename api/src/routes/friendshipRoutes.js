const express = require("express")
const {
  sendRequest,
  getAllRequests,
  getAllUserRequests,
  acceptDenyOrBlockRequest,
  undoFriendship,
  blockOrUnblockUser,
} = require("../controllers/FriendshipController")
const router = express.Router()

router.get("/", getAllRequests)
router.get("/:id", getAllUserRequests)
router.post("/:id", sendRequest)
router.put("/:id", acceptDenyOrBlockRequest)
router.delete("/:id", undoFriendship)
router.delete("/blocked/:id", blockOrUnblockUser)

module.exports = router
