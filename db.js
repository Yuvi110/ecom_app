import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log("Connected to Database");
  } catch (err) {
    console.log("Error in MongoDB", err);
  }
};
export default connectDB;
