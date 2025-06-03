import mongoose from "mongoose";

// Here, async function automatically returns a promise, that's why you are able to use .then() and .catch() in server.js
export const connectDB = async () => {
  try {
    // connect mongoDB and get connectionInstance
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // proccess code 1 means exit with failure, 0 means success
  }
};
