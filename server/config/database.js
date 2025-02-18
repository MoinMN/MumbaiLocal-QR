import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "MumbaiLocal-QR",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected Sucessfully on ${connect.connection.host}!`);
  } catch (error) {
    console.log(`MongoDB is Connection Failed due to ${error.message}`);
  }
}

export default connectToDB;