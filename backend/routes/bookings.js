import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ $or: [{ learner: req.user.id }, { tutor: req.user.id }] })
      .populate("learner", "name email")
      .populate("tutor", "name email skills subjects")
      .sort({ date: 1, time: 1, createdAt: -1 });
    res.json({ bookings });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const { tutor, subject, mode, date, time, location, notes } = req.body;
    if (!tutor || !subject || !date || !time) return res.status(400).json({ message: "Tutor, subject, date and time are required" });
    if (String(tutor) === String(req.user.id)) return res.status(400).json({ message: "You cannot book yourself" });
    const tutorUser = await User.findById(tutor);
    if (!tutorUser) return res.status(404).json({ message: "Tutor not found" });
    const booking = await Booking.create({ learner: req.user.id, tutor, subject, mode, date, time, location, notes });
    await booking.populate([{ path: "learner", select: "name email" }, { path: "tutor", select: "name email skills subjects" }]);
    res.status(201).json({ booking });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put("/:id/accept", auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (String(booking.tutor) !== String(req.user.id)) return res.status(403).json({ message: "Only the tutor can accept this request" });
  booking.status = "accepted"; await booking.save(); res.json({ booking });
});

router.put("/:id/reject", auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (String(booking.tutor) !== String(req.user.id)) return res.status(403).json({ message: "Only the tutor can reject this request" });
  booking.status = "rejected"; await booking.save(); res.json({ booking });
});

router.put("/:id/complete", auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (![String(booking.tutor), String(booking.learner)].includes(String(req.user.id))) {
    return res.status(403).json({ message: "You are not part of this session" });
  }
  booking.status = "completed"; await booking.save();
  if (String(booking.tutor) !== String(req.user.id)) await User.findByIdAndUpdate(booking.tutor, { $inc: { reputation: 5 } });
  res.json({ booking });
});

export default router;
