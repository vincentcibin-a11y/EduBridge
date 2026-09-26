import express from "express";
import mongoose from "mongoose";
import Doubt from "../models/Doubt.js";
import Notification from "../models/Notification.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.get("/", auth, async (req, res) => {
  try {
    const subject = typeof req.query.subject === "string" ? req.query.subject.trim().slice(0, 100) : "";
    const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";
    const filter = {};
    if (subject) filter.subject = { $regex: escapeRegex(subject), $options: "i" };
    if (search) {
      const query = escapeRegex(search);
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { subject: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ];
    }
    const doubts = await Doubt.find(filter)
      .populate("author", "name college skills subjects")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ doubts });
  } catch {
    res.status(500).json({ message: "Unable to load doubts right now" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, subject } = req.body;
    const rawTags = Array.isArray(req.body.tags) ? req.body.tags : [];
    if (typeof title !== "string" || !title.trim() ||
        typeof description !== "string" || !description.trim() ||
        typeof subject !== "string" || !subject.trim()) {
      return res.status(400).json({ message: "Title, description and subject are required" });
    }
    if (title.trim().length > 160 || description.trim().length > 5000 || subject.trim().length > 100) {
      return res.status(400).json({ message: "Title, description or subject exceeds the allowed length" });
    }
    const tags = rawTags
      .filter((tag) => typeof tag === "string")
      .map((tag) => tag.trim().slice(0, 40))
      .filter(Boolean)
      .slice(0, 10);

    const doubt = await Doubt.create({
      title: title.trim(),
      description: description.trim(),
      subject: subject.trim(),
      tags,
      author: req.user.id
    });
    await doubt.populate("author", "name college skills subjects");
    res.status(201).json({ doubt });
  } catch {
    res.status(500).json({ message: "Unable to create the doubt right now" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid doubt ID" });
    }
    const doubt = await Doubt.findById(req.params.id)
      .populate("author", "name college skills subjects")
      .populate("answers.user", "name skills subjects reputation");
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });
    res.json({ doubt });
  } catch {
    res.status(500).json({ message: "Unable to load this doubt right now" });
  }
});

router.post("/:id/answers", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid doubt ID" });
    }
    if (typeof req.body.content !== "string" || !req.body.content.trim()) {
      return res.status(400).json({ message: "Answer content is required" });
    }
    if (req.body.content.trim().length > 5000) {
      return res.status(400).json({ message: "Answer must be 5000 characters or fewer" });
    }
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });
    doubt.answers.push({ user: req.user.id, content: req.body.content.trim() });
    await doubt.save();

    if (String(doubt.author) !== String(req.user.id)) {
      await Notification.create({
        recipient: doubt.author,
        type: "answer",
        title: "New peer answer",
        message: "Someone answered your academic doubt.",
        link: `/doubts/${doubt._id}`
      });
    }

    await doubt.populate("answers.user", "name skills subjects reputation");
    res.status(201).json({ doubt });
  } catch {
    res.status(500).json({ message: "Unable to post this answer right now" });
  }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid doubt ID" });
    }
    if (!["open", "resolved"].includes(req.body.status)) {
      return res.status(400).json({ message: "Status must be open or resolved" });
    }
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });
    if (String(doubt.author) !== String(req.user.id)) {
      return res.status(403).json({ message: "Only the author can update status" });
    }
    doubt.status = req.body.status;
    await doubt.save();
    res.json({ doubt });
  } catch {
    res.status(500).json({ message: "Unable to update this doubt right now" });
  }
});

export default router;
