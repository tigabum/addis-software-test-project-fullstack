// db.js

const mongoose = require("mongoose");
const db =
  "mongodb+srv://tigabutg:L498p9nEHugu2o8X@cluster0.qpnw70c.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
