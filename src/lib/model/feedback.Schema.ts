import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    interviewId: { type: mongoose.Types.ObjectId, ref: "interviews" },
    totalScore: Number,
    categoryScores: [
      {
        name: String,
        score: Number,
        comment: String,
      },
    ],
    strengths: [
      {
        type: String,
        required: true,
      },
    ],
    areasForImprovement: [
      {
        type: String,
        required: true,
      },
    ],
    finalAssessment: String,
  },
  { timestamps: true }
);
export const Feedbacks =
  mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);
