// models/AnnualContribution.ts

import mongoose, { Schema, Document } from "mongoose";

interface IMonthlyContributions {
  "24-Jan"?: number;
  "24-Feb"?: number;
  "24-Mar"?: number;
  "24-Apr"?: number;
  "24-May"?: number;
  "24-Jun"?: number;
  "24-Jul"?: number;
  "24-Aug"?: number;
  "24-Sep"?: number;
  "24-Oct"?: number;
  "24-Nov"?: number;
  "24-Dec"?: number;
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
    openingBalance: { type: Number, required: true },
    monthly: {

      "24-Jan": { type: Number, default: 0 },
      "24-Feb": { type: Number, default: 0 },
      "24-Mar": { type: Number, default: 0 },
      "24-Apr": { type: Number, default: 0 },
      "24-May": { type: Number, default: 0 },
      "24-Jun": { type: Number, default: 0 },
      "24-Jul": { type: Number, default: 0 },
      "24-Aug": { type: Number, default: 0 },
      "24-Sep": { type: Number, default: 0 },
      "24-Oct": { type: Number, default: 0 },
      "24-Nov": { type: Number, default: 0 },
      "24-Dec": { type: Number, default: 0 },
    },
    total: { type: Number, required: true },
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
