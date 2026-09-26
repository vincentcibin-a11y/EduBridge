import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, trim: true, maxlength: 1000, default: "" }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
