import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, trim: true, maxlength: 1000 },
    mainImageUrl: { type: String, trim: true, maxlength: 1000 },
    relatedImages: [{ type: String, trim: true, maxlength: 1000 }],
    caption: { type: String, required: true, trim: true, maxlength: 400 },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

galleryImageSchema.index({ sortOrder: 1, createdAt: -1 });

export const GalleryImage =
  mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema);
