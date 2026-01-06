# Tratics

Full-stack application with Next.js client and Express.js server.

## Project Structure

```
tratics/
├── client/          # Next.js frontend application
│   ├── app/         # Next.js App Router
│   ├── src/         # Source files (lib, types, utils)
│   └── public/      # Static assets
├── server/          # Express.js backend API
│   └── src/         # Source files
│       ├── config/  # Configuration files
│       ├── controllers/  # Route controllers
│       ├── middleware/   # Express middleware
│       ├── models/       # Data models
│       ├── routes/       # API routes
│       └── types/        # TypeScript types
└── package.json     # Root workspace configuration
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MySQL database

## Getting Started

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 2. Environment Setup

#### Server Environment

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=foodApp
```

#### Client Environment

Create a `.env.local` file in the `client/` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000

# Environment
NEXT_PUBLIC_ENV=development
```

### 3. Run Development Servers

#### Option 1: Run Both Servers (Recommended)

From the root directory:

```bash
npm run dev
```

This will start both the client (port 3000) and server (port 4000) concurrently.

#### Option 2: Run Separately

**Server:**

```bash
cd server
npm run dev
```

**Client:**

```bash
cd client
npm run dev
```

## Available Scripts

### Root Level

- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run lint` - Lint both client and server
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Server

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Lint TypeScript files
- `npm run type-check` - Type check without emitting files
- `npm run clean` - Remove dist directory

### Client

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application for production
- `npm run start` - Start production server
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Fix linting errors automatically
- `npm run type-check` - Type check without emitting files

## Architecture

### Server Architecture

The server follows a clean architecture pattern:

- **Routes** (`src/routes/`) - Define API endpoints
- **Controllers** (`src/controllers/`) - Handle request/response logic
- **Models** (`src/models/`) - Database queries and data access
- **Middleware** (`src/middleware/`) - Express middleware (error handling, etc.)
- **Config** (`src/config/`) - Configuration files (environment, database)

### Client Architecture

The client uses Next.js App Router:

- **App Directory** (`app/`) - Next.js pages and layouts
- **Components** (`app/components/`) - Reusable React components
- **Lib** (`src/lib/`) - Utility functions and API client
- **Types** (`src/types/`) - TypeScript type definitions

## API Client Usage

The client includes a typed API client for making requests:

```typescript
import { apiClient } from '@/lib/api/client';

// GET request
const data = await apiClient.get<YourType>('/api/endpoint');

// POST request
const result = await apiClient.post<ResponseType>('/api/endpoint', {
  // request body
});
```

## Code Quality

### Linting

- **Client**: Uses ESLint with Next.js configuration
- **Server**: Uses ESLint with TypeScript configuration

### Formatting

- Uses Prettier for consistent code formatting
- Configuration in `.prettierrc.json`

### TypeScript

- Strict mode enabled
- Type checking on both client and server
- Shared types should be manually synchronized between client and server

## Environment Variables

### Server

| Variable            | Description       | Default       |
| ------------------- | ----------------- | ------------- |
| `PORT`              | Server port       | `4000`        |
| `NODE_ENV`          | Environment       | `development` |
| `DATABASE_HOST`     | Database host     | Required      |
| `DATABASE_USER`     | Database user     | Required      |
| `DATABASE_PASSWORD` | Database password | Required      |
| `DATABASE_NAME`     | Database name     | Required      |

### Client

| Variable              | Description  | Default                 |
| --------------------- | ------------ | ----------------------- |
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:4000` |
| `NEXT_PUBLIC_ENV`     | Environment  | `development`           |

## Database

The server uses MySQL2 with connection pooling. Make sure your database is running and accessible before starting the server.

## Production Build

### Build Both Applications

```bash
npm run build
```

### Run Production Server

```bash
cd server
npm start
```

### Run Production Client

```bash
cd client
npm start
```

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Write clean, readable code
4. Run linters before committing
5. Update this README when adding new features

## License

ISC
