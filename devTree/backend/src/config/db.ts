import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI); // connection.connection = {connection}
    console.log("Connected MongoDB");
    console.log(`${connection.host}: ${connection.port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
