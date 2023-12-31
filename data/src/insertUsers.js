const bcrypt = require("bcryptjs");
const fs = require("fs");
const ProgressBar = require("progress");

/**
 * @typedef {import("./generateUsers").User} User
 */

/**
 * @param {import("mongodb").Db} db
 * @param {string} usersFname
 * @param {string} randomUserPassword
 */
const insertUsers = async (db, usersFname, randomUserPassword) => {
  try {
    /**
     * @type {User[]}
     */
    const users = JSON.parse(fs.readFileSync(usersFname, "utf8"));
    const bar = new ProgressBar("[:bar] :current/:total".cyan, {
      complete: "*",
      total: users.length,
    });
    for (const { name, email } of users) {
      bar.tick();
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        continue;
      }
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(randomUserPassword, salt);
      await db.collection("users").insertOne({
        email,
        name,
        password,
        isChatbot: false,
      });
    }
    if (bar.complete) {
      console.log("successfully inserted new users".green);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = insertUsers;
