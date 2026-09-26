import express from "express";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.get("/", auth, async (req, res) => {
  try {
    const { subject, skill, search } = req.query;
    const filter = { _id: { $ne: req.user.id } };
    if (subject) filter.subjects = { $regex: escapeRegex(String(subject)), $options: "i" };
    if (skill) filter.skills = { $regex: escapeRegex(String(skill)), $options: "i" };
    if (search) {
      const query = escapeRegex(String(search).trim().slice(0, 100));
      if (query) {
        filter.$or = [
          { name: { $regex: query, $options: "i" } },
          { bio: { $regex: query, $options: "i" } },
          { skills: { $regex: query, $options: "i" } },
          { subjects: { $regex: query, $options: "i" } }
        ];
      }
    }

    const tutors = await User.find(filter)
      .select("name college course semester bio skills subjects availability reputation ratingAverage ratingCount")
      .sort({ reputation: -1, ratingAverage: -1, name: 1 })
      .limit(100);
    res.json({ tutors });
  } catch (e) {
    res.status(500).json({ message: "Unable to find tutors right now" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid tutor ID" });
    }
    const tutor = await User.findById(req.params.id)
      .select("name college course semester bio skills subjects availability reputation ratingAverage ratingCount");
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.json({ tutor });
  } catch (e) {
    res.status(500).json({ message: "Unable to load tutor right now" });
  }
});

export default router;
