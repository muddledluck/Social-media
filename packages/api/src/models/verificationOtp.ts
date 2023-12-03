import { Schema, model, type Document } from "mongoose";
export interface VerificationOtp {
  userId: string;
  otp: string;
}

export interface VerificationOtpDocument extends VerificationOtp, Document {
  createdAt: Date;
  updatedAt: Date;
}

const verificationOtpSchema = new Schema<VerificationOtpDocument>(
  {
    userId: { type: String, required: true },
    otp: { type: String, required: true },
  },
  {
    timestamps: true,
    expireAfterSeconds: 60 * 15, // 15 minutes
  },
);

const _verificationOtpModel = model<VerificationOtpDocument>(
  "verificationOtp",
  verificationOtpSchema,
);
export default _verificationOtpModel;
