# Tratics

Full-stack movie and series tracking app built with a Next.js (App Router) frontend, an Express + TypeScript API, and a MySQL database. Content (movies/series/episodes/genres) is sourced from a headless WordPress instance, while user data (auth, watchlist, favorites) lives in MySQL.

## Highlights

- Browse movies and series, view details, and stream via embedded or external providers.
- User authentication with JWTs stored in httpOnly cookies.
- Personal watchlist and favorites backed by MySQL.
- Search, genre filtering, and trending/recent sections.
- Admin and analytics endpoints for management and usage tracking.

## Architecture

- **client/**: Next.js 16 App Router frontend (TypeScript + Tailwind CSS)
- **server/**: Express API (TypeScript) + MySQL
- **server/database.sql**: Database schema for users, sessions, and lists
- **WordPress REST**: Content source for movies/series/episodes/genres

## Requirements

- Node.js 22.x (see `package.json` engines)
- npm >= 9
- MySQL 8+

## Quick Start

```bash
npm install
```

### Configure environment

Create the local env files from the examples and fill in values.

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

**Server (`server/.env`)**

```env
PORT=4000
NODE_ENV=development

DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

JWT_SECRET=your-super-secret-jwt-key
COOKIE_SECURE=false

# Frontend URLs (available in env config; update CORS in server/src/app.ts)
CLIENT_URLS=http://localhost:3000
```

**Client (`client/.env.local`)**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENV=development

# Optional WordPress config (defaults used if omitted)
NEXT_PUBLIC_WP_BASE_URL=https://tratics.dritongashi.com
NEXT_PUBLIC_WP_MOVIE_REST_BASE=movies
NEXT_PUBLIC_WP_SERIES_REST_BASE=series
NEXT_PUBLIC_WP_EPISODE_REST_BASE=episodes
```

### Database setup

Run the schema in `server/database.sql` against your MySQL instance.

```sql
-- Example (use your preferred MySQL client)
SOURCE server/database.sql;
```

### Run locally

```bash
npm run dev
```

- App: `http://localhost:3000`
- API: `http://localhost:4000`
- API docs: `http://localhost:4000/docs`

## Useful Scripts

From the repo root:

- `npm run dev` - Run client + server concurrently
- `npm run dev:client` - Run Next.js client only
- `npm run dev:server` - Run Express API only
- `npm run build` - Build client and server
- `npm run lint` - Lint all code
- `npm run format` - Prettier format

Within packages:

- `cd client && npm run type-check`
- `cd server && npm run type-check`

## API Overview

Base URL (local): `http://localhost:4000`

- `GET /health` - Health check
- `GET /health/version` - Build/runtime info
- `GET /health/check` - DB readiness + endpoint list
- `GET /docs` - API documentation
- `POST /api/auth/*` - Authentication
- `GET /api/me/*` - User profile + lists
- `GET /api/admin/*` - Admin endpoints
- `POST /api/analytics/*` - Analytics events

## WordPress Content

The frontend pulls content from a WordPress REST API. If you don't set the WP env vars, it defaults to `https://tratics.dritongashi.com`. Update `NEXT_PUBLIC_WP_BASE_URL` and the REST base slugs if you are using a different WordPress instance or custom post types.

## Deployment Notes

- The API is configured for Vercel serverless in `server/vercel.json`.
- Set `NEXT_PUBLIC_API_URL` to your deployed API base (often `https://<app>.vercel.app/api`).
- Set `COOKIE_SECURE=true` and use HTTPS in production.

## License

ISC
