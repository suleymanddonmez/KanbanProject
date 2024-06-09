import mongoose from "mongoose";

const connect = async () => {
  try {
    if (process.env.CONNECTIONSTR) {
      await mongoose.connect(process.env.CONNECTIONSTR);
    } else {
      throw new Error("Veritabanına bağlanırken bir hata oluştu!");
    }
  } catch {
    throw new Error("Veritabanına bağlanırken bir hata oluştu!");
  }
};

export default connect;
