const mongoose = require("mongoose");
//pass:KkOcrAgGqFOWxfbN/maharajshankar012
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://maharajshankar012:KkOcrAgGqFOWxfbN@cluster0.vjapmhl.mongodb.net/mern-ai?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Mangodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`error connecting to MangoDB ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
