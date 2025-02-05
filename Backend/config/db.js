import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB ${mongoose.connection.host} `.bgWhite);
  } catch (error) {
    console.log("DB ERROR", error);
  }
};
