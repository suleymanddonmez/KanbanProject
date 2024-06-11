import mongoose from "mongoose";

const connect = async () => {
  try {
    if (process.env.CONNECTIONSTR) {
      await mongoose.connect(process.env.CONNECTIONSTR);
    } else {
      throw new Error("Database connection error!");
    }
  } catch {
    throw new Error("Database connection error!");
  }
};

export default connect;
