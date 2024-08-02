const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { mongoURI } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI,{
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
  });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;