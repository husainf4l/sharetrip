# ShareTrip Architecture (summary)

This document summarizes the scaffold and the components to implement for ShareTrip.

Components:

- Web: Next.js (src/app). Uses Tailwind for styling and provides the tours search/filter UI.
- Mobile: Flutter (not included in scaffold). Follow Material 3 and re-use backend REST APIs.
- Backend: NestJS app in `backend/` with Prisma ORM. REST endpoints + WebSocket support for live features.
- Database: PostgreSQL (Supabase or RDS). Use pgvector extension for semantic embeddings & matching.
- AI: OpenAI/Gemini for recommendations and embedding generation. Store embeddings in `Embedding.vector` (Bytes) and create pgvector index.

MVP scope included in scaffold:

- Tours filter endpoint and Next.js filter UI.
- Prisma schema for users, tours, bookings, preferences, embeddings.

Next steps:

- Implement auth (JWT + social logins).
- Add payments (Stripe integration).
- Add WebSocket gateway for live updates.
- Build Flutter app and wire push notifications via Firebase.
