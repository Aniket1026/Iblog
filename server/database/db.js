import mongoose from "mongoose";

const Connection = async (USERNAME, PASSWORD) => {
  const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@iblog.c6vj61n.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting" + error);
  }
};
export default Connection;
