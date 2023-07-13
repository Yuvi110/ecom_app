import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoute);

app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running"));
