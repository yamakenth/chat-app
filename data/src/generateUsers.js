const colors = require("colors");
const fs = require("fs");

const RANDOM_USER_ENDPOINT = "https://randomuser.me/api";

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 */

/**
 * @param {number} numUsers
 * @param {string} usersFname
 */
const generateUsers = async (numUsers, usersFname) => {
  try {
    const searchParams = new URLSearchParams({ results: numUsers });
    const res = await fetch(`${RANDOM_USER_ENDPOINT}?${searchParams}`, {
      method: "GET",
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    const mappedUsers = mapUsers(data.results);
    fs.writeFileSync(usersFname, JSON.stringify(mappedUsers));
    console.log(`successfully created ${usersFname}`.green);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @param {*} users
 * @returns {User[]}
 */
const mapUsers = (users) => {
  const mappedUsers = users.map((u) => ({
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
  }));
  return mappedUsers;
};

module.exports = generateUsers;
