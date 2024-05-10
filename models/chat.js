const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    messages: [
      {
        text: { type: String, required: true },
        sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        // might need to add more to this to include images
      },
    ],
    users: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
      },
    ],
  },
  { timestamps: true }
);

/*
chat id
messages: [text, id, date]
*/

chatSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Chat", chatSchema);
