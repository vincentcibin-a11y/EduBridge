import express from "express";
import Doubt from "../models/Doubt.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { subject, search } = req.query;
    const filter = {};
    if (subject) filter.subject = new RegExp(subject, "i");
    if (search) filter.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") }
    ];
    const doubts = await Doubt.find(filter).populate("author", "name college skills subjects").sort({ createdAt: -1 });
    res.json({ doubts });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, subject, tags = [] } = req.body;
    if (!title || !description || !subject) return res.status(400).json({ message: "Title, description and subject are required" });
    const doubt = await Doubt.create({ title, description, subject, tags, author: req.user.id });
    await doubt.populate("author", "name college skills subjects");
    res.status(201).json({ doubt });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id)
      .populate("author", "name college skills subjects")
      .populate("answers.user", "name skills subjects reputation");
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });
    res.json({ doubt });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/:id/answers", auth, async (req, res) => {
  try {
    if (!req.body.content?.trim()) return res.status(400).json({ message: "Answer content is required" });
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });
    doubt.answers.push({ user: req.user.id, content: req.body.content.trim() });
    await doubt.save();
    await doubt.populate("answers.user", "name skills subjects reputation");
    res.status(201).json({ doubt });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });
    if (String(doubt.author) !== String(req.user.id)) return res.status(403).json({ message: "Only the author can update status" });
    doubt.status = req.body.status === "resolved" ? "resolved" : "open";
    await doubt.save();
    res.json({ doubt });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

export default router;
