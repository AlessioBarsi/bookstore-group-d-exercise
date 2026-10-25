# The Quiet Page

A full-stack web app for an independent bookstore. The frontend is built with React + Vite + Tailwind CSS v4, backed by an Express API with a Neon Postgres database. Originally built as an exercise for Mayerfeld Consulting Frontend Developer Practicum.

## Features

- Responsive navbar with mobile hamburger menu
- Split hero section with background image and overlay
- Book grid loaded from the API, with a genre filter dropdown
- Registration, login and logout with email and password
- Favorite button (heart toggle) saved per user in the database
- Events section with book club and author meetup cards
- Footer with quick links, store info, and copyright

## Tech Stack

**Client:** React 19, Vite, React Router, Tailwind CSS v4 (with `@tailwindcss/vite`), better-auth client

**Server:** Node.js, Express 5, Drizzle ORM, PostgreSQL on Neon, better-auth, Zod

## Color Palette

| Variable | Hex | Usage |
| :--- | :---: | :--- |
| `--bg` | `#FCF0DA` | Main background (off-white) |
| `--ink` | `#000000` | Main text |
| `--primary` | `#769452` | Section backgrounds, accents |
| `--secondary` | `#EDC77B` | Buttons, events |
| `--dark` | `#4C4541` | Navbar, buttons |

## Getting Started

### Server

```bash
cd server
npm install
```

Create `server/.env`:

```text
DATABASE_URL=<your Neon connection string>
BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
```

Then create the tables, seed them, and start the server:

```bash
npm run db:push
npm run db:seed   # asks for the first seed user's password
npm run dev       # http://localhost:3000
```

### Client

```bash
cd client
npm install
```

Create `client/.env`:

```text
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev       # http://localhost:5173
```

Open the app at `http://localhost:5173` (not `127.0.0.1`), so cookies and CORS work.

## API

| Method | Route | Auth | Description |
| :--- | :--- | :---: | :--- |
| GET | `/api/books` | No | All books with author and genre |
| GET | `/api/authors` | No | All authors |
| GET | `/api/genres` | No | All genres |
| GET | `/api/favorites` | Yes | Current user's favorite books |
| POST | `/api/favorites/:bookId` | Yes | Add a favorite |
| DELETE | `/api/favorites/:bookId` | Yes | Remove a favorite |
| GET | `/api/health` | No | Health check |
| * | `/api/auth/*` | | Handled by better-auth (sign-up, sign-in, sign-out, session) |

## Scripts (server)

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start with auto-reload |
| `npm start` | Start for production |
| `npm run db:push` | Push the schema to the database |
| `npm run db:seed` | Reset and seed the database (**deletes existing data**) |
| `npm run db:studio` | Open Drizzle Studio |

## Project Structure

```text
client/
├── public/images/
└── src/
    ├── components/
    ├── context/FavoritesContext.jsx
    ├── lib/              # auth-client.js, api.js
    ├── pages/            # Login, Register, Logout, ...
    ├── App.jsx
    └── index.css
server/
├── uploads/book-covers/  # served at /uploads
└── src/
    ├── auth/auth.js      # better-auth config
    ├── db/               # schema, connection, seed
    ├── middleware/       # requireAuth, validate, errorHandler
    ├── routes/           # books, authors, genres, favorites
    └── index.js
```

## Deployment

The server runs on Render (build: `npm install`, start: `npm start`) with a Neon database. On the free plan the server sleeps after 15 minutes idle, so the first request after a quiet period can take about a minute. Set the same environment variables as above in the host's dashboard, using the deployed URLs.