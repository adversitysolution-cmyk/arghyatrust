import mongoose from 'mongoose';

const ctaEventSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, trim: true, maxlength: 80 },
    section: { type: String, required: true, trim: true, maxlength: 120 },
    action: { type: String, required: true, trim: true, maxlength: 80 },
    label: { type: String, trim: true, maxlength: 180 },
    targetPath: { type: String, trim: true, maxlength: 200 },
    targetUrl: { type: String, trim: true, maxlength: 500 },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const CtaEvent = mongoose.models.CtaEvent || mongoose.model('CtaEvent', ctaEventSchema);

