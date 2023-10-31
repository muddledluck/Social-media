import express from "express";
import dotenv from "dotenv";
import { Database } from "./utils/dbConnection";
import router from "./router";
import path from "path";
import EmailService from "./utils/emailService";
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
const PORT = process.env.PORT || 4000;

// database connection
const db = new Database(
  process.env.mongoURI || "mongodb://0.0.0.0:27017/social-media"
);
db.connect();

// email service
export const emailService = new EmailService();
emailService.init();
emailService.verifyConnection();

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `*`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (_req, res) => {
  res.send("Yay!🚀");
});

// routes
router.forEach((route) => {
  app.use(route.prefix, route.router);
});

app.listen(PORT, () => {
  console.log(`Server is running 🚀🚀🚀🚀 http://localhost:${PORT}`);
});
