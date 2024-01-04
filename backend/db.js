const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/notes";

// const connectMongo = async () => {
//   await mongoose.connect(mongooseURI, () => {
//     console.log("Connected");
//   });
// };
const connectMongo = async () => {
  try {
    await mongoose.connect(mongooseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
module.exports = connectMongo;
