// require model
const Chat = require("../models/chat");

const getAllChats = async (req, res, next) => {
  // need to change this to getAllChats for logged in user
  // e.g. getAllChatsForUserID or getAllChatsForLoggedInUser
    const {uid} = req.params
  let allChats
  try {
    allChats = await Chat.find({ 'users.user': uid }).populate({
        path: 'messages.sender',
        select: 'username' // Select the username field to populate
      }, )
  } catch (err) {
    console.log(err)
  }

  console.log(allChats, 'ALLCHATS')

  return res.json({ chats: allChats });
};

const createNewChat = async (req, res, next) => {
    // this will be used if there isn't a current chat between the 2 users
    // include in req.body both users that should be added to this chat, then add both in users array
    console.log(req.body)
    const {loggedInUser, addedUser, loggedInUserUsername, addedUserUsername} = req.body

      const createdChat = new Chat({
      messages: [],
        users: [
          {
            user: loggedInUser,
            username: loggedInUserUsername
          },
          {
            user: addedUser,
            username: addedUserUsername
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
    foundChat = await Chat.findOne({_id: cid}).populate({
                              path: 'messages.sender',
                              select: 'username'
                           })
                           .populate({
                            path: 'users.user',
                            select: 'username'
                         });
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
