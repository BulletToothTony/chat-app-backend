// require model
const Chat = require("../models/chat");

const chatList = [
  {
    id: "1",
    users: ["uid1, uid2"],
    messages: [
      {
        messageId: "m1",
        text: "hello!",
        // each message will also have a timestamp
      },
      {
        messageId: "m2",
        text: "hello to you too!",
      },
    ],
  },
  {
    id: "2",
    users: ["uid1, uid2"],
    messages: [
      {
        messageId: "m3",
        text: "Wow this is cool!",
      },
      {
        messageId: "m4",
        text: "I know right!",
      },
    ],
  },
];

const getAllChats = async (req, res, next) => {
  // need to change this to getAllChats for logged in user
  // e.g. getAllChatsForUserID or getAllChatsForLoggedInUser

  let allChats
  try {
    allChats = await Chat.find({})
  } catch (err) {
    console.log(err)
  }

  return res.json({ chats: allChats });
};

const createNewChat = async (req, res, next) => {
    // this will be used if there isn't a current chat between the 2 users
    // include in req.body both users that should be added to this chat, then add both in users array
      const createdChat = new Chat({
      messages: [],
        users: [
          {
            user: '663e856213f3ee53bd09e3e0',
          },
          {
            user: '663e8a3c61c8439921e03ffe',
          },
        ],
    });

  try {
      await createdChat.save()
  } catch(err) {
      console.log(err)
  }

  res.json({createdChat})
}

const getChatByID = async (req, res, next) => {
  const { cid } = req.params;

  let foundChat;
  try {
    foundChat = await Chat.findOne({_id: cid})
  } catch(err) {
    console.log(err)
  }

  return res.json({ chat: foundChat });
};

const postChatMessage = async (req, res, next) => {
  const { cid } = req.params;
  const { sendinguserId, messageId, text } = req.body;

  let existingChat;
  try {
    existingChat = await Chat.findOneAndUpdate(
      { _id: cid },
      { $push: { messages: { text: text, sender: sendinguserId, timestamp: new Date()} } },
      { new: true }
    );
  } catch (err) {
  }

  return res.json({ messages: existingChat });
};

exports.getAllChats = getAllChats;
exports.getChatByID = getChatByID;
exports.postChatMessage = postChatMessage;
exports.createNewChat = createNewChat;
