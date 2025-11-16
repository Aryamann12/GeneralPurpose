# Fullstack Setup

## Backend (NestJS)
- `cd server`
- Ensure `.env` has `PORT=4000` and valid MongoDB connection (either `MONGODB_URI` or username/password/host).
- `npm install`
- `npm run start:dev`

The API listens on `http://localhost:4000`. Example routes:
- `GET /items` – list items
- `POST /items` – create item `{ name, description? }`
- `GET /items/:id` – get one
- `PUT /items/:id` – update `{ name?, description? }`
- `DELETE /items/:id` – delete one
- `DELETE /items` – delete all
- `GET /tools` – list tools
- `POST /tools/batch` – upsert array of tools
- `DELETE /tools` – delete all

## Frontend (React)
- `cd client`
- `npm install`
- `npm start`

The React dev server runs on `http://localhost:3000` and calls the API at `http://localhost:4000` (configured via `client/.env`).

Open `http://localhost:3000` to see the Atlas UI:
- Tools panel: Seed demo tools, list connections, clear tools
- Items panel: Add, edit inline, delete, clear all

The server logs each request in the terminal so you can observe interactions.
