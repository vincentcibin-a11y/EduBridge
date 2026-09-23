import express from "express";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { subject, skill, search } = req.query;
    const filter = { _id: { $ne: req.user.id } };
    if (subject) filter.subjects = { $regex: subject, $options: "i" };
    if (skill) filter.skills = { $regex: skill, $options: "i" };
    if (search) filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { bio: { $regex: search, $options: "i" } },
      { skills: { $regex: search, $options: "i" } },
      { subjects: { $regex: search, $options: "i" } }
    ];
    const tutors = await User.find(filter)
      .select("name college course semester bio skills subjects availability reputation")
      .sort({ reputation: -1, name: 1 });
    res.json({ tutors });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/:id", auth, async (req, res) => {
  const tutor = await User.findById(req.params.id)
    .select("name college course semester bio skills subjects availability reputation");
  if (!tutor) return res.status(404).json({ message: "Tutor not found" });
  res.json({ tutor });
});

export default router;
