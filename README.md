# AISeguros

This repository contains a small Express backend and a React/Vite frontend.

## Installation

Install Node.js dependencies for both projects:

```bash
cd backend
npm install
cd ../frontend
npm install
```

## Running the projects

### Backend

From the `backend/` directory run:

```bash
npm start
```

### Frontend

From the `frontend/` directory run:

```bash
npm run dev
```

This starts the Vite development server.

## Environment variables

The backend expects the following environment variables in a `.env` file:

- `PORT` – Port for the Express server (defaults to `5000` if not specified).
- `MONGODB_URI` – MongoDB connection URI.

Set these variables before starting the backend.

