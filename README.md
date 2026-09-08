# Arghya Trust Monorepo

This repository contains:
- `AT`: public website + backend API
- `admin`: admin frontend

## One-command setup

1. Install all dependencies:
`npm run install:all`
2. Run all services in development:
`npm run dev`

Dev URLs:
- Public site: `http://localhost:5173`
- Admin site: `http://localhost:5174`
- API: `http://localhost:5000`

## Production (single backend process)

1. Build both frontends:
`npm run build`
2. Start backend:
`npm run start`

When `NODE_ENV=production`, backend serves:
- Public frontend at `/`
- Admin frontend at `/admin`
- API at `/api`

## Always-on process with PM2

1. Install PM2 globally:
`npm i -g pm2`
2. Build apps:
`npm run build`
3. Start process:
`pm2 start ecosystem.config.cjs`
4. Save and enable startup on reboot:
`pm2 save`
`pm2 startup`
