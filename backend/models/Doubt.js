import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, trim: true }
}, { timestamps: true });

const doubtSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ["open", "resolved"], default: "open" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [answerSchema]
}, { timestamps: true });

export default mongoose.model("Doubt", doubtSchema);
