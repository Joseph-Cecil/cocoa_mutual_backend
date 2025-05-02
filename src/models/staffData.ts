import mongoose, { Schema, Document } from 'mongoose';

export interface IContributionLog {
  month: string; // e.g., "2024-04"
  amount: number;
}

export interface IInterestRecord {
  year: number;
  type: 'general' | 'pro-rata';
  rate: number;
  amount: number;
}

export interface IPayoutRecord {
  year: number;
  amount: number;
  date: Date;
}

export interface IAuditLog {
  action: string;
  date: Date;
  performedBy: string; // could be admin user ID
  remarks?: string;
}

export interface IStaffData extends Document {
  staffId: number;
  name: string;
  status: 'active' | 'inactive';
  optOut: boolean;
  contributions: IContributionLog[];
  totalContribution: number;
  topUpDeposit: number;
  partialWithdrawal: number;
  balanceForTheYear: number;
  interestRecords: IInterestRecord[];
  payoutHistory: IPayoutRecord[];
  auditLogs: IAuditLog[];
}

const StaffDataSchema = new Schema<IStaffData>(
  {
    staffId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    optOut: {
      type: Boolean,
      default: false,
    },
    contributions: [
      {
        month: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    totalContribution: { type: Number, default: 0 },
    topUpDeposit: { type: Number, default: 0 },
    partialWithdrawal: { type: Number, default: 0 },
    balanceForTheYear: { type: Number, default: 0 },

    interestRecords: [
      {
        year: { type: Number, required: true },
        type: {
          type: String,
          enum: ['general', 'pro-rata'],
          required: true,
        },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],

    payoutHistory: [
      {
        year: { type: Number, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],

    auditLogs: [
      {
        action: { type: String, required: true },
        date: { type: Date, default: Date.now },
        performedBy: { type: String, required: true },
        remarks: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const StaffData = mongoose.model<IStaffData>('StaffData', StaffDataSchema);
