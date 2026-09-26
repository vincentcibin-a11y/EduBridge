import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = Number(process.env.PORT || 5000);

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    console.error("JWT_SECRET must be set in production. Refusing to start.");
    process.exit(1);
  }
  process.env.JWT_SECRET = "edubridge-dev-secret-change-me";
  console.warn("JWT_SECRET is missing; using a local development fallback. Set it in backend/.env for production use.");
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/edubridge", {
  serverSelectionTimeoutMS: 5000
})
  .then(() => app.listen(PORT, () => console.log(`EduBridge API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
