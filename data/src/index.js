const path = require("path");
const generateChats = require("./generateChats");
const generateMessages = require("./generateMessages");
const generateUsers = require("./generateUsers");

const NUM_USERS = "50";
const USERS_FNAME = "users.json";
const CHATS_FNAME = "chats.json";
const MESSAGES_FNAME = "messages.json";

const main = async () => {
  await generateUsers(NUM_USERS, USERS_FNAME);
  await generateChats(CHATS_FNAME, USERS_FNAME);
  await generateMessages(MESSAGES_FNAME, CHATS_FNAME);
};

main();
