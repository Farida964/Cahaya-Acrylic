import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import TestiRoute from "./routes/TestiRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // supaya foto bisa diakses
app.use(TestiRoute);

try {
  await db.authenticate();
  console.log("Database connected...");
  await db.sync({ alter: true }); // ✅ otomatis update tabel
} catch (error) {
  console.error("Database connection error:", error);
}

app.listen(5000, '0.0.0.0', () => console.log("Server running on http://0.0.0.0:5000"));

