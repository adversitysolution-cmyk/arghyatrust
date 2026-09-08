import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { connectMongo } from './db/connectMongo.js';
import { seedDefaults } from './data/seedDefaults.js';
import { ensureDefaultAdmin } from './data/seedAdmin.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
let dbReady = false;
let dbLastError = null;

const configuredOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((value) => value.trim()).filter(Boolean)
  : [];

const localhostOriginPattern = /^https?:\/\/localhost:\d+$/;

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (configuredOrigins.length === 0) return true;
  if (configuredOrigins.includes(origin)) return true;
  if (localhostOriginPattern.test(origin)) return true;
  return false;
}

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      req.headers['access-control-request-headers'] || 'Content-Type, Authorization',
    );
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});
app.use(express.json({ limit: '1mb' }));
if (!isProduction) {
  app.use('/assets', express.static(path.join(__dirname, '../src/assets')));
}
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    dbReady,
    dbError: dbLastError ? String(dbLastError.message || dbLastError) : null,
  });
});

app.use('/api', (req, res, next) => {
  if (dbReady) return next();
  if (req.path === '/health' || req.path === '/admin/login') return next();
  return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
});
app.use('/api', publicRoutes);
app.use('/api', adminRoutes);

function resolveDir(value, fallbackPath) {
  if (!value) return fallbackPath;
  return path.isAbsolute(value) ? value : path.resolve(process.cwd(), value);
}

if (isProduction) {
  const publicDist = resolveDir(process.env.PUBLIC_DIST_PATH, path.resolve(__dirname, '../dist'));
  const adminDist = resolveDir(process.env.ADMIN_DIST_PATH, path.resolve(__dirname, '../../admin/dist'));
  const publicIndex = path.join(publicDist, 'index.html');
  const adminIndex = path.join(adminDist, 'index.html');

  if (fs.existsSync(adminIndex)) {
    app.use('/admin', express.static(adminDist));
    app.get('/admin/{*route}', (_req, res) => {
      res.sendFile(adminIndex);
    });
  } else {
    console.warn(`Admin build not found at ${adminDist}`);
  }

  if (fs.existsSync(publicIndex)) {
    app.use(express.static(publicDist));
    app.get('/{*route}', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/admin')) {
        return next();
      }
      return res.sendFile(publicIndex);
    });
  } else {
    console.warn(`Public build not found at ${publicDist}`);
  }
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectMongoWithRetry() {
  while (!dbReady) {
    try {
      await connectMongo();
      await seedDefaults();
      await ensureDefaultAdmin();
      dbReady = true;
      dbLastError = null;
      console.log('MongoDB connected and default content/admin seeded.');
      return;
    } catch (err) {
      dbReady = false;
      dbLastError = err;
      console.error('MongoDB connection failed. Retrying in 15 seconds...');
      await wait(15000);
    }
  }
}

async function start() {
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
  void connectMongoWithRetry();
}

start().catch((err) => {
  console.error('Failed to start API server', err);
  process.exit(1);
});
