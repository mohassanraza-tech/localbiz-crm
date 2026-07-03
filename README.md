# LocalBiz CRM Lite

A lightweight CRM for Indian small businesses to manage leads, follow-ups, and customer notes.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt

## Project Structure

```
localbiz-crm/
├── client/     # React frontend
├── server/     # Express backend
└── README.md
```

## Getting Started

### Backend Setup (Phase 2)

```powershell
cd server
copy .env.example .env
# Edit .env with your MongoDB Atlas URI and JWT secret
npm install
npm run dev
```

Server runs at `http://localhost:5000`

### API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login, get JWT | No |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/leads` | List leads | Yes |
| POST | `/api/leads` | Create lead | Yes |
| GET | `/api/leads/stats` | Dashboard stats | Yes |
| GET | `/api/leads/:id` | Get one lead | Yes |
| PUT | `/api/leads/:id` | Update lead | Yes |
| DELETE | `/api/leads/:id` | Delete lead | Yes |
| POST | `/api/leads/:id/notes` | Add note | Yes |

### Frontend Setup (Phase 3)

```powershell
cd client
copy .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

Make sure the backend is also running (`cd server` → `npm run dev`).

## Author

Built as a portfolio project for Full Stack Developer internship applications.
