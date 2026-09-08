import mongoose from 'mongoose';

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    sourcePage: {
      type: String,
      trim: true,
      default: 'global',
    },
  },
  { timestamps: true },
);

newsletterSubscriberSchema.index({ email: 1 }, { unique: true });

export const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
