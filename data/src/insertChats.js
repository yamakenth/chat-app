const fs = require("fs");
const ProgressBar = require("progress");

/**
 * @param {import("mongodb").Db} db
 * @param {string} chatsFname
 */
const insertChats = async (db, chatsFname) => {
  try {
    /**
     * @type {Object.<string, string[]>}
     */
    const chats = JSON.parse(fs.readFileSync(chatsFname, "utf8"));
    const bar = new ProgressBar("[:bar] :current/:total".cyan, {
      complete: "*",
      total: Object.keys(chats).length,
    });
    for (const [senderEmail, recipientEmails] of Object.entries(chats)) {
      bar.tick();
      const senderId = await findUserId(db, senderEmail);
      for (const recipientEmail of recipientEmails) {
        const recipientId = await findUserId(db, recipientEmail);
        const existingChat = await db.collection("chats").findOne({
          $and: [
            { users: { $elemMatch: { $eq: senderId } } },
            { users: { $elemMatch: { $eq: recipientId } } },
          ],
        });
        if (existingChat) {
          continue;
        }
        await db.collection("chats").insertOne({
          users: [senderId, recipientId],
        });
      }
    }
    if (bar.complete) {
      console.log("successfully inserted new chats".green);
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

module.exports = insertChats;
