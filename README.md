# LocalBiz CRM Lite

A lightweight CRM for Indian small businesses (salons, coaching centers, local shops) to manage leads, follow-ups, and customer notes.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)

## Live Demo

| App | URL |
|---|---|
| Frontend | _Add your Vercel URL after deployment_ |
| Backend API | _Add your Render URL after deployment_ |

## Features

- JWT authentication (register, login, protected routes)
- Lead CRUD with status pipeline: `New → Contacted → Qualified → Closed`
- Follow-up notes timeline on each lead
- Dashboard with lead statistics
- Search and filter leads by status
- Role-based access (Admin sees all, Agent sees own leads)
- Responsive UI (desktop sidebar + mobile bottom nav)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt |
| Deployment | Vercel (frontend), Render (backend) |

## Project Structure

```
localbiz-crm/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # Axios instance + interceptors
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # AuthContext (global state)
│   │   ├── pages/          # Route pages
│   │   └── utils/          # Helper functions
│   └── vercel.json         # Vercel SPA routing
├── server/                 # Express backend
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Business logic
│   ├── middleware/         # JWT auth guard
│   ├── models/             # Mongoose schemas
│   └── routes/             # API routes
├── render.yaml             # Render deployment config
└── README.md
```

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier)
- Git

### 1. Clone the repository

```powershell
git clone https://github.com/YOUR_USERNAME/localbiz-crm.git
cd localbiz-crm
```

### 2. Backend setup

```powershell
cd server
copy .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/localbiz-crm
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

```powershell
npm install
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Frontend setup

Open a new terminal:

```powershell
cd client
copy .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login, get JWT | No |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/leads` | List leads (search/filter) | Yes |
| POST | `/api/leads` | Create lead | Yes |
| GET | `/api/leads/stats` | Dashboard stats | Yes |
| GET | `/api/leads/:id` | Get one lead | Yes |
| PUT | `/api/leads/:id` | Update lead | Yes |
| DELETE | `/api/leads/:id` | Delete lead | Yes |
| POST | `/api/leads/:id/notes` | Add note | Yes |

Protected routes require header: `Authorization: Bearer <token>`

## Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New → Blueprint**
3. Connect your GitHub repo (uses `render.yaml` automatically)
4. Set environment variables in Render dashboard:
   - `MONGODB_URI` — your Atlas connection string
   - `JWT_SECRET` — a long random string
   - `CLIENT_URL` — your Vercel frontend URL (e.g. `https://localbiz-crm.vercel.app`)
5. Deploy → copy your API URL (e.g. `https://localbiz-crm-api.onrender.com`)

**Manual deploy (without Blueprint):**

- New Web Service → connect repo
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Add the same environment variables above

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `client`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-api.onrender.com/api`
5. Deploy → copy your frontend URL

### After deployment

1. Update Render `CLIENT_URL` with your Vercel URL
2. Redeploy backend if CORS was blocking requests
3. Test: register → login → create lead on live site

## Screenshots

_Add screenshots to a `docs/screenshots/` folder and link them here:_

- Login page
- Dashboard with stats
- Leads list with search
- Lead detail with notes

## Author

Built as a portfolio project for Full Stack Developer internship applications.

**GitHub:** [YOUR_USERNAME/localbiz-crm](https://github.com/YOUR_USERNAME/localbiz-crm)
