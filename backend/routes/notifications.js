import express from "express";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const [notifications, unread] = await Promise.all([
      Notification.find({ recipient: req.user.id })
        .sort({ createdAt: -1 })
        .limit(50),
      Notification.countDocuments({ recipient: req.user.id, read: false })
    ]);
    res.json({ notifications, unread });
  } catch {
    res.status(500).json({ message: "Unable to load notifications right now" });
  }
});

// Keep this fixed route before /:id/read so "read-all" is not treated as an ID.
router.put("/read-all", auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "All notifications marked as read" });
  } catch {
    res.status(500).json({ message: "Unable to update notifications right now" });
  }
});

router.put("/:id/read", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid notification ID" });
    }
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.id },
      { $set: { read: true } },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json({ notification });
  } catch {
    res.status(500).json({ message: "Unable to update this notification right now" });
  }
});

export default router;
