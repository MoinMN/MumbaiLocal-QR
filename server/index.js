import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } })); // 5MB limit

// connect database
import connectToDB from "./config/database.js";
await connectToDB();

// routes

import AuthRoute from "./routes/auth.route.js"
app.use('/auth', AuthRoute);

import QRRoute from "./routes/qr.route.js"
app.use('/qr', QRRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT}`);
});

export default app;