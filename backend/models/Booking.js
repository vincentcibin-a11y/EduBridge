import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true, trim: true },
  mode: { type: String, enum: ["offline", "online"], default: "offline" },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, default: "" },
  notes: { type: String, default: "" },
  status: { type: String, enum: ["pending", "accepted", "rejected", "completed", "cancelled"], default: "pending" },
  reviewedByLearner: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
