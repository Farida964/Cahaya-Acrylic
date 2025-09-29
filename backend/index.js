import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import TestiRoute from "./routes/TestiRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads")); // Ini tidak akan berfungsi di Vercel
app.use(TestiRoute);

// Koneksi database tidak perlu dijalankan di sini untuk serverless
// try {
//   await db.authenticate();
//   console.log("Database connected...");
//   await db.sync({ alter: true });
// } catch (error) {
//   console.error("Database connection error:", error);
// }

// Hapus app.listen, dan ekspor app untuk Vercel
// app.listen(5000, '0.0.0.0', () => console.log("Server running on http://0.0.0.0:5000"));

export default app;
