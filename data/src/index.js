const connectDB = require("./db");
const { RANDOM_USER_PASSWORD } = require("./environment");
const generateChats = require("./generateChats");
const generateMessages = require("./generateMessages");
const generateUsers = require("./generateUsers");
const insertChats = require("./insertChats");
const insertMessages = require("./insertMessages");
const insertUsers = require("./insertUsers");

const NUM_USERS = "50";
const USERS_FNAME = "users.json";
const CHATS_FNAME = "chats.json";
const MESSAGES_FNAME = "messages.json";

const main = async () => {
  /* generate json files of mock data
  await generateUsers(NUM_USERS, USERS_FNAME);
  await generateChats(CHATS_FNAME, USERS_FNAME);
  await generateMessages(MESSAGES_FNAME, CHATS_FNAME);
  */

  const client = await connectDB();
  const db = client.db("test");
  try {
    await insertUsers(db, USERS_FNAME, RANDOM_USER_PASSWORD);
    await insertChats(db, CHATS_FNAME);
    await insertMessages(db, MESSAGES_FNAME);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
  }
  client.close();
};

main();
