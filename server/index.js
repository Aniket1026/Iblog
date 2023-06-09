import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}....`);
});
// Connection(USERNAME, PASSWORD)
