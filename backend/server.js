import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import doubtRoutes from "./routes/doubts.js";
import tutorRoutes from "./routes/tutors.js";
import bookingRoutes from "./routes/bookings.js";
import notificationRoutes from "./routes/notifications.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "EduBridge API" }));

app.use("/api/auth", authRoutes);
app.use("/api/doubts", doubtRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/edubridge")
  .then(() => app.listen(PORT, () => console.log(`EduBridge API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
