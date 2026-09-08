# Arghya Trust Public Site + API

## Local development (AT app only)

1. Install dependencies:
`npm i`
2. Start frontend:
`npm run dev`
3. Start backend:
`npm run server`

## Environment

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` or `MONGODB_URI` to your MongoDB Atlas connection string.
3. For local development, use:
`VITE_API_BASE_URL=http://localhost:5000`

## Production

The backend can serve built frontend files.

1. Build frontend:
`npm run build`
2. Start backend in production:
`NODE_ENV=production npm run start`

Optional overrides:
- `PUBLIC_DIST_PATH`: path to AT dist directory.
- `ADMIN_DIST_PATH`: path to admin dist directory.
