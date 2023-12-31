const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGO_URI;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const USER_POPULATION_PASSWORD = process.env.USER_POPULATION_PASSWORD;
const RANDOM_USER_PASSWORD = process.env.RANDOM_USER_PASSWORD;

module.exports = {
  MONGO_URI,
  OPENAI_API_KEY,
  RANDOM_USER_PASSWORD,
  USER_POPULATION_PASSWORD,
};
