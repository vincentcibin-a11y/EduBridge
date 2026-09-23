import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

const publicUser = (u) => ({
  id: u._id, name: u.name, email: u.email, college: u.college,
  course: u.course, semester: u.semester, bio: u.bio,
  skills: u.skills, subjects: u.subjects, availability: u.availability,
  reputation: u.reputation, role: u.role
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, college, course, semester } = req.body;
    if (!name || !email || !password || !college) {
      return res.status(400).json({ message: "Name, email, password and college are required" });
    }
    if (password.length < 6) return res.status(400).json({ message: "Password must contain at least 6 characters" });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "An account with this email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed, college, course, semester });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !(await bcrypt.compare(password || "", user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user: publicUser(user) });
});

router.put("/profile", auth, async (req, res) => {
  try {
    const allowed = ["name", "bio", "course", "semester", "skills", "subjects", "availability"];
    const update = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true });
    res.json({ user: publicUser(user) });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

export default router;
