const express = require("express");

const chatControllers = require("../controllers/chat-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/:uid", chatControllers.getAllChats);

router.get("/chatById/:cid", chatControllers.getChatByID);

router.post("/createChat", chatControllers.createNewChat);

router.post("/:cid", chatControllers.postChatMessage);

module.exports = router;
