// models/AnnualContribution.ts

import mongoose, { Schema, Document } from "mongoose";

interface IMonthlyContributions {
  "Jan"?: number;
  "Feb"?: number;
  "Mar"?: number;
  "Apr"?: number;
  "May"?: number;
  "Jun"?: number;
  "Jul"?: number;
  "Aug"?: number;
  "Sep"?: number;
  "Oct"?: number;
  "Nov"?: number;
  "Dec"?: number;
}

export interface IAnnualContribution extends Document {
  staffId: string;
  name: string;
  openingBalance: number; 
  monthly: IMonthlyContributions;
  total: number;
  closingBalance: number; 
  interestPaid: number;
  balanceAfterInterest: number;
  withdrawal: number;
  carryForwardBalance: number; 
  year: string;
}

const AnnualContributionSchema = new Schema<IAnnualContribution>(
  {
    staffId: { type: String, required: true, index: true },
    name: { type: String, required: true },

    monthly: {

      "Jan": { type: Number, default: 0 },
      "Feb": { type: Number, default: 0 },
      "Mar": { type: Number, default: 0 },
      "Apr": { type: Number, default: 0 },
      "May": { type: Number, default: 0 },
      "Jun": { type: Number, default: 0 },
      "Jul": { type: Number, default: 0 },
      "Aug": { type: Number, default: 0 },
      "Sep": { type: Number, default: 0 },
      "Oct": { type: Number, default: 0 },
      "Nov": { type: Number, default: 0 },
      "Dec": { type: Number, default: 0 },
    },
    total: { type: Number, required: true },    
    openingBalance: { type: Number, required: true },
    closingBalance: { type: Number, required: true },
    interestPaid: { type: Number, required: true },
    balanceAfterInterest: { type: Number, required: true },
    withdrawal: { type: Number, required: true },
    carryForwardBalance: { type: Number, required: true },
    year: { type: String, default: "2024" }
  },
  { timestamps: true }
);

const AnnualContribution = mongoose.model<IAnnualContribution>(
  "AnnualContribution",
  AnnualContributionSchema
);

export default AnnualContribution;
