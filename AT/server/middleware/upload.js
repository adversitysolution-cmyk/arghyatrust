import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, '../uploads');
const galleryRoot = path.join(uploadsRoot, 'gallery');
const blogRoot = path.join(uploadsRoot, 'blogs');

for (const dir of [uploadsRoot, galleryRoot, blogRoot]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createStorage(destinationRoot) {
  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, destinationRoot);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname || '').toLowerCase();
      const safeExt = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension)
        ? extension
        : '.jpg';
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
    },
  });
}

const galleryStorage = createStorage(galleryRoot);
const blogStorage = createStorage(blogRoot);

const storageFileFilter = (_req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image files are allowed'));
    return;
  }
  cb(null, true);
};

export const galleryUpload = multer({
  storage: galleryStorage,
  fileFilter: storageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 12,
  },
});

export const blogUpload = multer({
  storage: blogStorage,
  fileFilter: storageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});
