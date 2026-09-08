import mongoose from 'mongoose';

const volunteerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    age: { type: Number, min: 16, max: 100 },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    qualification: { type: String, trim: true, maxlength: 180 },
    cityState: { type: String, trim: true, maxlength: 180 },
    language: { type: String, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
    whatsapp: { type: String, trim: true, maxlength: 30 },
    interest: { type: String, trim: true, maxlength: 80 },
    duration: { type: String, trim: true, maxlength: 80 },
    pledge: { type: Boolean, default: false },
    sourcePage: { type: String, default: 'contact' },
  },
  { timestamps: true },
);

export const VolunteerApplication =
  mongoose.models.VolunteerApplication ||
  mongoose.model('VolunteerApplication', volunteerApplicationSchema);
