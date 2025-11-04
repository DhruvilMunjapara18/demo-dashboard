import mongoose, { Schema, Document, Model } from "mongoose";

// user
export interface IUser extends Document {
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

// schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
      index: true 
    },
    country: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { 
    timestamps: true,
    strict: true 
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
