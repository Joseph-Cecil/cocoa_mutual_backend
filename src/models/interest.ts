import mongoose, { Schema, Document } from "mongoose";

export interface IInterest extends Document {
  year: number;
  type: 'general' | 'pro-rata';
  value: number;
  setBy: string; // Admin staffId or userId
  affectedStaffId?: number; // For pro-rata, optional reference
  createdAt: Date;
  updatedAt: Date;
}

const InterestSchema: Schema = new Schema(
  {
    year: { type: Number, required: true },
    type: {
      type: String,
      enum: ['general', 'pro-rata'],
      required: true,
    },
    value: { type: Number, required: true }, // e.g., 7.5 (%)
    setBy: { type: String, required: true },
    affectedStaffId: { type: Number, required: false }, // Optional if type is "pro-rata"
  },
  { timestamps: true }
);

export const Interest = mongoose.model<IInterest>("Interest", InterestSchema);
