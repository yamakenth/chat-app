const colors = require("colors");
const fs = require("fs");

/**
 * @typedef {import("./generateUsers").User} User
 */

/**
 * @param {string} chatsFname
 * @param {string} usersFname
 */
const generateChats = async (chatsFname, usersFname) => {
  /**
   * @type {User[]}
   */
  const users = JSON.parse(fs.readFileSync(usersFname, "utf8"));

  /**
   * @type {Object.<string, Set<string>>}
   */
  const randomChatsSet = {};
  for (let i = 0; i < users.length; i++) {
    let numPairs = Math.floor(generateRandomNumber(users.length) / 5);
    const curUserEmail = users[i].email;
    if (
      curUserEmail === "kyamada@example.com" ||
      curUserEmail === "guest@example.com"
    ) {
      numPairs = 12;
    }
    randomChatsSet[curUserEmail] = new Set();
    for (let j = 0; j < numPairs; j++) {
      const randomIndex = generateRandomNumber(users.length);
      if (randomIndex === i) {
        continue;
      }
      randomChatsSet[curUserEmail].add(users[randomIndex].email);
    }
  }

  /**
   * @type {Object.<string, string[]>}
   */
  const randomChatsArray = {};
  for (const [sender, receivers] of Object.entries(randomChatsSet)) {
    randomChatsArray[sender] = Array.from(receivers);
  }

  fs.writeFileSync(chatsFname, JSON.stringify(randomChatsArray));
  console.log(`successfully created ${chatsFname}`.green);
};

/**
 * @param {number} max
 * @returns {number}
 */
const generateRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

module.exports = generateChats;
