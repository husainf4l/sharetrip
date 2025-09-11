This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# ShareTrip (scaffold)

This repository contains a Next.js frontend (in `src/app`) and a backend scaffold (in `backend/`) for the ShareTrip project: a Social & Shared Tours Marketplace.

Quickstart (frontend):

1. Install dependencies at repo root and run dev server (Next.js):

   - Open a terminal in `c:\Users\Al-hu\sharetripx` and run your package manager (project uses Next.js already).

Backend (NestJS + Prisma):

1. cd into `backend/` and run `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Run `npx prisma generate` and `npx prisma migrate dev --name init` to create the DB schema.
4. Start the server with `npm run start:dev`.

This scaffold includes:

- Prisma schema with models for users, tours, bookings, preferences, and embeddings (pgvector-ready).
- A NestJS module exposing `/tours/filter` and `/tours/match` endpoints.
- Swagger UI at `/docs` once the backend is running.

Next steps: wire authentication, payments, WebSockets, Flutter mobile app, and AI pipeline.
