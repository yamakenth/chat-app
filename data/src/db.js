const { MongoClient } = require("mongodb");
const { MONGO_URI } = require("./environment");

const client = new MongoClient(MONGO_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log(`MongoDB Connected: ${MONGO_URI}`.green);
    return client;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = connectDB;
