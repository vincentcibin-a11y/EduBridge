import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // A valid signature alone is not enough: protected routes require a usable user ID.
    if (!payload || typeof payload !== "object" ||
        !mongoose.isValidObjectId(payload.id) ||
        (payload.role !== undefined && !["student", "admin"].includes(payload.role))) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = { id: String(payload.id), role: payload.role || "student" };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
