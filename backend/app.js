import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import doubtRoutes from "./routes/doubts.js";
import tutorRoutes from "./routes/tutors.js";
import bookingRoutes from "./routes/bookings.js";
import notificationRoutes from "./routes/notifications.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();
const DEFAULT_CLIENT_URL = "http://localhost:5173";
const ALLOWED_ORIGINS = new Set([
  process.env.CLIENT_URL || DEFAULT_CLIENT_URL,
  "http://127.0.0.1:5173",
  "http://localhost:5173"
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("CORS policy: origin not allowed"));
  },
  credentials: true
}));
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
  if (err.message === "CORS policy: origin not allowed") {
    return res.status(403).json({ message: "Origin not allowed by CORS policy" });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body must be 1 MB or smaller" });
  }
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
