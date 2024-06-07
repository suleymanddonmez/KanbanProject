const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoString = process.env.CONNECTIONSTR;

mongoose
  .connect(mongoString)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantısı başarısız", err));

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
