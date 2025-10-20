# CricketLive - Live Cricket Score Platform

## Overview

CricketLive is a real-time cricket scoring and engagement platform built with React and Express. The application provides live cricket scores, ball-by-ball commentary, match analysis, player statistics, tournament standings, and community polls. It follows Material Design principles inspired by Cricbuzz and ESPN Cricinfo, prioritizing information density and scannability for sports data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: 
- shadcn/ui components (Radix UI primitives)
- "new-york" style variant
- Tailwind CSS for styling with custom design tokens
- Typography: Inter (body/stats) and Rajdhani (scores/headlines) from Google Fonts

**State Management**:
- TanStack Query (React Query) for server state and data fetching
- Local component state with React hooks
- Query invalidation strategy for real-time data updates

**Routing**: Wouter for lightweight client-side routing

**Design System**:
- Cricket-themed color palette (cricket green primary, slate secondary)
- Light and dark mode support with localStorage persistence
- HSL-based color system for theme consistency
- Responsive design with mobile-first approach

### Backend Architecture

**Runtime**: Node.js with Express.js

**API Design**: RESTful endpoints with JSON responses
- `/api/matches` - Cricket match data with status filtering (live/recent/upcoming)
- `/api/polls` - Community polls with voting functionality
- `/api/players` - Player statistics and profiles
- `/api/tournaments` - Tournament standings and tables
- `/api/auth/user` - User authentication status

**Authentication**: 
- Replit Auth (OpenID Connect)
- Passport.js strategy implementation
- Session-based authentication with PostgreSQL session store
- Graceful handling of unauthenticated requests (returns null instead of errors)

**Real-time Updates**:
- WebSocket server integration for live match updates
- Polling-based updates via React Query with configurable intervals

### Data Storage

**Database**: PostgreSQL (via Neon serverless)
- Connection pooling with `@neondatabase/serverless`
- WebSocket-based connections for serverless compatibility

**ORM**: Drizzle ORM
- Type-safe database queries
- Schema-first approach with Zod validation
- Migration support via drizzle-kit

**Schema Design**:
- `users` - User profiles (id, email, firstName, lastName, profileImageUrl)
- `sessions` - Session storage for authentication (sid, sess, expire)
- `polls` - Poll questions (id, question, createdAt, isActive)
- `pollOptions` - Poll choices (id, pollId, text, votes)
- `pollVotes` - User votes tracking (id, pollId, optionId, userId)

**Data Access Pattern**: Repository pattern via storage interface (IStorage) for abstraction and testability

### External Dependencies

**Cricket Data API**:
- Provider: cricapi.com API (v1)
- Authentication: API key via environment variable `CRICKET_API_KEY`
- Endpoints: Current matches, match details, player stats
- Data transformation layer to normalize API responses into application models

**Authentication Provider**:
- Replit Auth OIDC
- Configuration via `ISSUER_URL` and `REPL_ID` environment variables
- Token-based session management with 7-day TTL

**Third-Party Services**:
- Google Fonts API (Inter, Rajdhani typefaces)
- Neon Database (serverless PostgreSQL)

**Development Tools**:
- Replit-specific plugins for development environment
- Vite plugins: runtime error overlay, cartographer, dev banner (development only)

### Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `CRICKET_API_KEY` - Cricket data API authentication
- `SESSION_SECRET` - Session encryption key
- `REPL_ID` - Replit workspace identifier
- `REPLIT_DOMAINS` - Allowed authentication domains
- `ISSUER_URL` - OIDC provider URL (defaults to replit.com/oidc)

### Key Design Decisions

**Monorepo Structure**:
- Shared schema definitions in `/shared` directory
- Separate client and server code with clear boundaries
- Path aliases for clean imports (@, @shared, @assets)

**Error Handling**:
- Graceful degradation for authentication failures
- Centralized error middleware in Express
- User-friendly error messages via toast notifications

**Performance Optimizations**:
- Memoization of OIDC configuration (1-hour cache)
- Query result caching with infinite stale time (manual invalidation)
- Static asset serving in production
- Code splitting via dynamic imports for development plugins

**Accessibility**:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support via Radix UI primitives