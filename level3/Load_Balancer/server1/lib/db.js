import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME // optional if URL already contains DB
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed", error);
  }
}
export default connectDb