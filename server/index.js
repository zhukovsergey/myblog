import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Backend server is running!");
});

//ROUTES
app.use("/api/user", userRoute);
