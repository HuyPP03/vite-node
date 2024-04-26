import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import configViewEngine from "./config/viewEngine.js";
import userRoute from "./route/userRoute.js";
import connectDB from "./config/connectDB.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};
connectDB();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configViewEngine(app);
userRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
