import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  staffId: string;
  phone: string;
  password: string;
  role: 'admin' | 'staff';
  isOptedOut: boolean;
  isDeceased: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  annualContribution: mongoose.Types.ObjectId; // <-- Renamed for clarity
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    staffId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
    isOptedOut: { type: Boolean, default: false },
    isDeceased: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    annualContribution: { type: mongoose.Schema.Types.ObjectId, ref: 'AnnualContribution' }
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
