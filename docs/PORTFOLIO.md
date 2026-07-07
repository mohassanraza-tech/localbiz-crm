# Portfolio Materials — LocalBiz CRM Lite

Use this document for your resume, LinkedIn, and interview preparation.

---

## Resume Project Description

**LocalBiz CRM Lite** | React, Node.js, Express, MongoDB, JWT  
_GitHub: github.com/YOUR_USERNAME/localbiz-crm | Live: your-app.vercel.app_

- Built a full-stack CRM web app for Indian small businesses to manage leads, track follow-ups, and monitor sales pipeline status
- Implemented JWT authentication with bcrypt password hashing and role-based access control (Admin/Agent)
- Designed RESTful APIs with Express.js and MongoDB Atlas, including CRUD operations, search/filter, and dashboard analytics
- Developed responsive React frontend with Tailwind CSS, protected routes, and Axios interceptors for token management
- Deployed frontend on Vercel and backend on Render with environment-based configuration and CORS security

---

## LinkedIn Project Post

**Copy-paste and customize:**

---

Excited to share my latest full-stack project: **LocalBiz CRM Lite**

Many small businesses in India still manage leads using WhatsApp chats and Excel sheets. I built a simple CRM to solve this — track leads, update status, and add follow-up notes in one place.

**What I built:**
- User authentication (JWT + bcrypt)
- Lead management with pipeline: New → Contacted → Qualified → Closed
- Dashboard with real-time stats
- Search, filter, and follow-up notes
- Responsive UI for mobile and desktop

**Tech stack:**
React.js | Tailwind CSS | Node.js | Express.js | MongoDB Atlas | JWT

**What I learned:**
- REST API design and MVC architecture
- Secure authentication and protected routes
- MongoDB schema design with Mongoose
- Deploying full-stack apps (Vercel + Render)
- Git workflow with meaningful commits

This project helped me understand how real business software is structured — not just tutorials, but production-style code organization.

GitHub: [your link]
Live Demo: [your link]

Open to Full Stack Developer internship opportunities. DMs welcome!

#webdevelopment #reactjs #nodejs #mongodb #fullstack #internship #bcstudent #portfolio

---

## Technical Interview Questions

### React / Frontend

**Q: How does authentication work in your app?**  
A: User logs in → backend returns JWT → stored in localStorage → Axios interceptor attaches `Authorization: Bearer <token>` to every request → ProtectedRoute checks if user exists in AuthContext → if not, redirect to login.

**Q: What is AuthContext and why did you use it?**  
A: React Context provides global auth state (user, login, logout) without prop drilling. Any component can call `useAuth()` to access user info or trigger login/logout.

**Q: How do protected routes work?**  
A: `ProtectedRoute` wrapper checks `user` from AuthContext. If loading, show spinner. If no user, redirect to `/login`. Otherwise render the page.

**Q: Why Axios interceptors?**  
A: Request interceptor auto-attaches JWT token. Response interceptor handles 401 errors globally — clears token and redirects to login. Write once, works everywhere.

### Node.js / Backend

**Q: Explain your folder structure.**  
A: MVC pattern — `models/` (database schemas), `controllers/` (business logic), `routes/` (URL mapping), `middleware/` (JWT verification). Keeps code organized and scalable.

**Q: How are passwords stored securely?**  
A: bcrypt hashes passwords before saving. `select: false` on password field prevents it from being returned in queries. On login, `bcrypt.compare()` checks the entered password against the hash.

**Q: What is JWT and how does it work?**  
A: JSON Web Token — signed token containing user ID. Server generates it on login using `JWT_SECRET`. Client sends it in headers. Middleware verifies signature and loads user. Expires after 7 days.

**Q: Explain role-based access in your lead APIs.**  
A: Admin can see all leads. Agent filter adds `createdBy: req.user._id` so agents only see leads they created. Same check on update/delete/getById returns 403 if unauthorized.

### MongoDB / Database

**Q: Why MongoDB over MySQL for this project?**  
A: CRM data is flexible — notes are embedded arrays, fields vary per lead. MongoDB's document model fits this without complex JOINs. Schema is still defined with Mongoose for validation.

**Q: Explain your Lead schema.**  
A: Lead has name, phone, email, businessType, status (enum), source (enum), notes array (embedded subdocuments with text, addedBy, timestamp), assignedTo and createdBy (ObjectId refs to User).

**Q: What is population in Mongoose?**  
A: `.populate('createdBy', 'name email')` replaces ObjectId with actual user document fields. Used to show who created a lead without manual JOIN queries.

### General / Architecture

**Q: How does frontend communicate with backend?**  
A: React calls REST APIs via Axios. Backend runs on port 5000, frontend on 5173. CORS configured to allow frontend origin. JSON request/response format with consistent `{ success, message, data }` structure.

**Q: How did you deploy the project?**  
A: Backend on Render (Node.js web service, env vars for MongoDB URI and JWT secret). Frontend on Vercel (Vite build, `VITE_API_URL` points to Render API). MongoDB Atlas for cloud database.

**Q: What would you improve next?**  
A: Email reminders for follow-ups, CSV export, activity audit log, refresh tokens, input validation library (Joi/Zod), unit tests with Jest, and admin panel to manage agents.

---

## HR Interview Questions

**Q: Tell me about yourself.**  
A: I'm a first-year BCA student passionate about web development. I built LocalBiz CRM Lite — a full-stack app for small businesses to manage leads. It uses React, Node.js, and MongoDB. I'm actively learning and looking for a Full Stack Developer internship to grow with a real team.

**Q: Why did you choose this project?**  
A: I wanted something practical for the Indian market, not a tutorial clone. Small businesses struggle with lead tracking — this solves a real problem and demonstrates skills recruiters look for: auth, APIs, database, and deployment.

**Q: What was the biggest challenge?**  
A: Connecting frontend auth to backend JWT flow — making sure tokens persist across page refreshes, handling expired tokens, and protecting routes correctly. I solved it with AuthContext + Axios interceptors.

**Q: Why should we hire you as a fresher?**  
A: I don't just watch tutorials — I build and deploy complete projects. LocalBiz CRM shows I can work across the full stack, write clean organized code, and learn independently. I'm eager to contribute and grow under mentorship.

**Q: Are you comfortable learning new technologies?**  
A: Yes. For this project I learned JWT auth, MongoDB Atlas, deployment on Render/Vercel, and React Context — all self-taught through building. I'm confident I can pick up any stack your team uses.

---

## GitHub README Checklist

Before sharing your repo with recruiters:

- [ ] Live demo links added
- [ ] Screenshots in README
- [ ] Clean commit history (feat:, fix:, chore:)
- [ ] No `.env` files committed
- [ ] `.env.example` files present
- [ ] Project description on GitHub repo page

---

## Screenshot Guide

Take these screenshots for your README and LinkedIn:

1. **Login page** — clean auth UI
2. **Dashboard** — stats cards with numbers
3. **Leads page** — list with search bar and status filter
4. **Lead detail** — edit form + notes timeline
5. **Mobile view** — resize browser to phone width, show bottom nav

Save to `docs/screenshots/` and add to README.
