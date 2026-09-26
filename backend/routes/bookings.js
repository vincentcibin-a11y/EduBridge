import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

const findBooking = async (id) => {
  if (!mongoose.isValidObjectId(id)) return null;
  return Booking.findById(id);
};

router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [{ learner: req.user.id }, { tutor: req.user.id }]
    })
      .populate("learner", "name email")
      .populate("tutor", "name email skills subjects ratingAverage ratingCount")
      .sort({ date: 1, time: 1, createdAt: -1 });
    res.json({ bookings });
  } catch (e) {
    res.status(500).json({ message: "Unable to load sessions right now" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { tutor, subject, mode = "offline", date, time, location = "", notes = "" } = req.body;
    if (!tutor || !subject?.trim() || !date || !time) {
      return res.status(400).json({ message: "Tutor, subject, date and time are required" });
    }
    if (!mongoose.isValidObjectId(tutor)) {
      return res.status(400).json({ message: "Invalid tutor ID" });
    }
    if (String(tutor) === String(req.user.id)) {
      return res.status(400).json({ message: "You cannot book yourself" });
    }
    if (!["offline", "online"].includes(mode)) {
      return res.status(400).json({ message: "Mode must be online or offline" });
    }
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(Date.parse(date)) ||
        typeof time !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      return res.status(400).json({ message: "Enter a valid session date and time" });
    }
    if (date < new Date().toISOString().slice(0, 10)) {
      return res.status(400).json({ message: "Session date cannot be in the past" });
    }

    const tutorUser = await User.findById(tutor);
    if (!tutorUser) return res.status(404).json({ message: "Tutor not found" });

    const booking = await Booking.create({
      learner: req.user.id,
      tutor,
      subject: subject.trim().slice(0, 100),
      mode,
      date,
      time,
      location: String(location).trim().slice(0, 200),
      notes: String(notes).trim().slice(0, 1000)
    });
    await Notification.create({
      recipient: tutor,
      type: "booking_request",
      title: "New tutoring request",
      message: "A student sent you a peer tutoring request.",
      link: "/bookings"
    });
    await booking.populate([
      { path: "learner", select: "name email" },
      { path: "tutor", select: "name email skills subjects ratingAverage ratingCount" }
    ]);
    res.status(201).json({ booking });
  } catch (e) {
    res.status(500).json({ message: "Unable to create the session request" });
  }
});

router.put("/:id/accept", auth, async (req, res) => {
  try {
    const booking = await findBooking(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (String(booking.tutor) !== String(req.user.id)) {
      return res.status(403).json({ message: "Only the tutor can accept this request" });
    }
    if (booking.status !== "pending") {
      return res.status(409).json({ message: "Only pending requests can be accepted" });
    }
    booking.status = "accepted";
    await booking.save();
    await Notification.create({
      recipient: booking.learner,
      type: "booking_update",
      title: "Tutoring request accepted",
      message: "Your peer tutor accepted the session request.",
      link: "/bookings"
    });
    res.json({ booking });
  } catch (e) {
    res.status(500).json({ message: "Unable to accept this request" });
  }
});

router.put("/:id/reject", auth, async (req, res) => {
  try {
    const booking = await findBooking(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (String(booking.tutor) !== String(req.user.id)) {
      return res.status(403).json({ message: "Only the tutor can reject this request" });
    }
    if (booking.status !== "pending") {
      return res.status(409).json({ message: "Only pending requests can be rejected" });
    }
    booking.status = "rejected";
    await booking.save();
    await Notification.create({
      recipient: booking.learner,
      type: "booking_update",
      title: "Tutoring request rejected",
      message: "Your peer tutor rejected the session request.",
      link: "/bookings"
    });
    res.json({ booking });
  } catch (e) {
    res.status(500).json({ message: "Unable to reject this request" });
  }
});

router.put("/:id/complete", auth, async (req, res) => {
  try {
    const booking = await findBooking(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    const userId = String(req.user.id);
    const learnerId = String(booking.learner);
    const tutorId = String(booking.tutor);
    if (![tutorId, learnerId].includes(userId)) {
      return res.status(403).json({ message: "You are not part of this session" });
    }
    if (booking.status !== "accepted") {
      return res.status(409).json({ message: "Only accepted sessions can be completed" });
    }

    booking.status = "completed";
    await booking.save();
    await User.findByIdAndUpdate(booking.tutor, { $inc: { reputation: 5 } });
    await Notification.create({
      recipient: userId === tutorId ? booking.learner : booking.tutor,
      type: "booking_update",
      title: "Session completed",
      message: "A tutoring session has been marked as completed.",
      link: "/bookings"
    });
    res.json({ booking });
  } catch (e) {
    res.status(500).json({ message: "Unable to complete this session" });
  }
});

export default router;
