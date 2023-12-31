const fs = require("fs");
const ProgressBar = require("progress");

/**
 * @typedef {import("./generateMessages").Message} Message
 */

/**
 * @param {import("mongodb").Db} db
 * @param {string} messagesFname
 */
const insertMessages = async (db, messagesFname) => {
  try {
    /**
     * @type {{conversation: Message[]}[]}
     */
    const messages = JSON.parse(fs.readFileSync(messagesFname, "utf8"));
    const bar = new ProgressBar("[:bar] :current/:total".cyan, {
      complete: "*",
      total: messages.length,
    });
    for (const message of messages) {
      bar.tick();
      const conversation = message.conversation;
      for (const { sender, receiver, content } of conversation) {
        const senderId = await findUserId(db, sender);
        const receiverId = await findUserId(db, receiver);
        const chatId = await findChatId(db, senderId, receiverId);
        const newMessage = await db.collection("messages").insertOne({
          chat: chatId,
          content,
          sender: senderId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await db
          .collection("chats")
          .updateOne(
            { _id: chatId },
            { $set: { latestMessage: newMessage.insertedId } }
          );
      }
    }
    if (bar.complete) {
      console.log("successfully inserted new users".green);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @param {import("mongodb").Db} db
 * @param {string} email
 * @returns {Promise<ObjectId>}
 */
const findUserId = async (db, email) => {
  try {
    const user = await db.collection("users").find({ email }).toArray();
    return user[0]._id;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @param {import("mongodb").Db} db
 * @param {string} sender
 * @param {string} receiver
 */
const findChatId = async (db, senderId, receiverId) => {
  try {
    const chat = await db.collection("chats").findOne({
      $and: [
        { users: { $elemMatch: { $eq: senderId } } },
        { users: { $elemMatch: { $eq: receiverId } } },
      ],
    });
    return chat._id;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = insertMessages;
