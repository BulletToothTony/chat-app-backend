const express = require("express");

const chatControllers = require("../controllers/chat-controllers");

const router = express.Router();

router.get("/", chatControllers.getAllChats);

router.get("/:cid", chatControllers.getChatByID);

router.post("/createChat", chatControllers.createNewChat);

router.post("/:cid", chatControllers.postChatMessage);

module.exports = router;
