import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// extract mongoose_uri
const connect_string = process.env.CONNECTION_STRING;

// database connection function
export const connectDB = async () => {
  try {
    await mongoose.connect(connect_string);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Error: " + error);
  }
};
