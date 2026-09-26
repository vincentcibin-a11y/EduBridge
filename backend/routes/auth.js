import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  college: u.college,
  course: u.course,
  semester: u.semester,
  bio: u.bio,
  skills: u.skills,
  subjects: u.subjects,
  availability: u.availability,
  reputation: u.reputation,
  ratingAverage: u.ratingAverage,
  ratingCount: u.ratingCount,
  role: u.role
});

const cleanList = (value) => {
  if (!Array.isArray(value)) return null;
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, 30);
};

router.post("/register", async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    const college = typeof req.body.college === "string" ? req.body.college.trim() : "";
    const course = typeof req.body.course === "string" ? req.body.course.trim() : "MCA";
    const semester = typeof req.body.semester === "string" ? req.body.semester.trim() : "";

    if (!name || !email || !password || !college) {
      return res.status(400).json({ message: "Name, email, password and college are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must contain at least 6 characters" });
    }
    if (name.length > 100 || email.length > 254 || college.length > 160 ||
        course.length > 100 || semester.length > 40) {
      return res.status(400).json({ message: "One or more fields exceed the allowed length" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "An account with this email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, college, course, semester });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: publicUser(user) });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: "An account with this email already exists" });
    res.status(500).json({ message: "Unable to create your account right now" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: publicUser(user) });
  } catch {
    res.status(500).json({ message: "Unable to log in right now" });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: publicUser(user) });
  } catch {
    res.status(500).json({ message: "Unable to load your profile right now" });
  }
});

router.put("/profile", auth, async (req, res) => {
  try {
    const allowed = ["name", "bio", "course", "semester", "skills", "subjects", "availability"];
    const update = {};
    for (const key of allowed) {
      if (!(key in req.body)) continue;
      const value = req.body[key];
      if (["skills", "subjects"].includes(key)) {
        const cleaned = cleanList(value);
        if (!cleaned) return res.status(400).json({ message: `${key} must be a list of text values` });
        update[key] = cleaned;
      } else {
        if (typeof value !== "string") {
          return res.status(400).json({ message: `${key} must be text` });
        }
        const cleaned = value.trim();
        const maxLength = key === "bio" ? 1000 : key === "name" ? 100 : key === "availability" ? 200 : 100;
        if (cleaned.length > maxLength) {
          return res.status(400).json({ message: `${key} must be ${maxLength} characters or fewer` });
        }
        if (key === "name" && !cleaned) {
          return res.status(400).json({ message: "Name cannot be empty" });
        }
        update[key] = cleaned;
      }
    }
    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: publicUser(user) });
  } catch {
    res.status(500).json({ message: "Unable to update your profile right now" });
  }
});

export default router;
