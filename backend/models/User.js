import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  college: { type: String, required: true, trim: true },
  course: { type: String, default: "MCA" },
  semester: { type: String, default: "" },
  bio: { type: String, default: "" },
  skills: [{ type: String, trim: true }],
  subjects: [{ type: String, trim: true }],
  availability: { type: String, default: "Flexible" },
  reputation: { type: Number, default: 0 },
  role: { type: String, enum: ["student", "admin"], default: "student" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
