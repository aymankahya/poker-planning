import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import strategy from "@/config/passport";

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(strategy); // Configure passport to use JWT Strategy

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

module.exports = app;
