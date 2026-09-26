import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/booking/:bookingId", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    const { rating, feedback = "" } = req.body;
    const score = Number(rating);
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      return res.status(400).json({ message: "Rating must be an integer from 1 to 5" });
    }
    if (typeof feedback !== "string") {
      return res.status(400).json({ message: "Feedback must be text" });
    }
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (String(booking.learner) !== String(req.user.id)) {
      return res.status(403).json({ message: "Only the learner can review this session" });
    }
    if (booking.status !== "completed") {
      return res.status(400).json({ message: "You can review a session only after it is completed" });
    }
    if (booking.reviewedByLearner) {
      return res.status(409).json({ message: "This session has already been reviewed" });
    }

    const review = await Review.create({
      booking: booking._id,
      learner: booking.learner,
      tutor: booking.tutor,
      rating: score,
      feedback: feedback.trim().slice(0, 1000)
    });
    booking.reviewedByLearner = true;
    await booking.save();

    const stats = await Review.aggregate([
      { $match: { tutor: new mongoose.Types.ObjectId(String(booking.tutor)) } },
      { $group: { _id: "$tutor", average: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);
    const summary = stats[0] || { average: 0, count: 0 };
    await User.findByIdAndUpdate(booking.tutor, {
      $set: { ratingAverage: Math.round(summary.average * 10) / 10, ratingCount: summary.count }
    });

    await review.populate("learner", "name");
    res.status(201).json({
      review,
      ratingAverage: Math.round(summary.average * 10) / 10,
      ratingCount: summary.count
    });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: "This session has already been reviewed" });
    res.status(500).json({ message: "Unable to submit the review right now" });
  }
});

router.get("/tutor/:tutorId", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.tutorId)) {
      return res.status(400).json({ message: "Invalid tutor ID" });
    }
    const reviews = await Review.find({ tutor: req.params.tutorId })
      .populate("learner", "name")
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ reviews });
  } catch {
    res.status(500).json({ message: "Unable to load tutor reviews right now" });
  }
});

export default router;
