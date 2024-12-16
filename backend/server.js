import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConnection.js";
import route from "./routes/userRoute.js";

dotenv.config();
connectDb();
const app = express();

// To parse incoming request bodies as JSON
app.use(bodyParser.json());
// Enable Cross-Origin Resource Sharing
app.use(cors());
app.use("/api/user", route);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
