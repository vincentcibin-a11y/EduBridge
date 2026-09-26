# EduBridge

## Peer-to-Peer Academic Doubt Solving & Student Tutoring Platform

EduBridge is a college-focused peer-learning web application where students can ask academic doubts, answer classmates' questions, discover knowledgeable peers and arrange structured tutoring sessions.

> **Core idea:** Every student can be both a learner and a peer tutor.

## Second Review MVP

The repository now contains a full-stack MVP for the core learner-to-tutor journey:

**Register/Login → Profile → Ask Doubt → Peer Answer → Find Tutor → Tutoring Request → Accept/Reject → Scheduled Session → Complete**

### Implemented

- JWT authentication with bcrypt password hashing
- Student profile with subjects, skills and availability
- Academic doubt creation, search and detail view
- Peer answers
- Peer tutor discovery by name, subject and skill
- Online/offline tutoring requests
- Date, time and campus-location scheduling
- Tutor accept/reject workflow
- Session completion, basic reputation points, and learner ratings/feedback
- Responsive React student dashboard
- MongoDB/Mongoose persistence
- Protected Express REST APIs
- In-app notifications for doubt answers and tutoring-request updates
- Session reviews with 1–5 ratings, optional feedback, and tutor rating averages

### Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| Styling | Responsive CSS |
| Development environment | Docker + Docker Compose |
| Version Control | Git + GitHub |

## Project Structure

```text
EduBridge/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── test/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
└── README.md
```

## Quick Start with Docker Compose (Recommended)

Docker Compose starts the frontend, backend API and MongoDB together. You do not need to install Node.js or MongoDB directly on your computer, but you do need Docker Desktop (Windows/macOS) or Docker Engine with the Compose plugin (Linux).

### 1. Install and start Docker

Install Docker Desktop from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) and make sure it is running.

### 2. Clone the repository

```bash
git clone https://github.com/vincentcibin-a11y/EduBridge.git
cd EduBridge
```

### 3. (Recommended) Set a local JWT secret

Compose has a development-only fallback secret so the project can start immediately. For your own local environment, create a file named `.env` in the repository root and set a unique secret:

```env
JWT_SECRET=replace-with-a-long-random-local-development-secret
```

The root `.env` file is ignored by Git. Do not use the development fallback or commit secrets in a production deployment.

### 4. Build and start all services

Run from the repository root:

```bash
docker compose up --build
```

The first run downloads the images and installs Node dependencies, so it may take a few minutes. Keep this terminal open to see service logs.

Open these URLs:

- **EduBridge frontend:** http://localhost:5173
- **Backend health check:** http://localhost:5000/api/health
- **MongoDB:** `mongodb://localhost:27017/edubridge`

The backend waits for MongoDB's health check before starting. The MongoDB database is stored in a named Docker volume and persists when containers are stopped.

### 5. Stop or restart the services

Stop the running stack with `Ctrl+C`, or from another terminal run:

```bash
docker compose down
```

Start it again later with:

```bash
docker compose up
```

To rebuild after changing a Dockerfile or dependencies:

```bash
docker compose up --build
```

To follow logs for one service:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

To remove the containers **and permanently delete the local MongoDB data volume**, run:

```bash
docker compose down -v
```

Only use `-v` if you intentionally want to erase the development database.

### Development workflow with Docker

The source folders are mounted into the frontend and backend containers. Code changes should be picked up by Vite and Nodemon, allowing hot reload without rebuilding the images. Dependencies are kept in named volumes so the host's `node_modules` folder does not overwrite the container's Linux dependencies.

If you change dependencies in either `package.json` or its lockfile, rebuild the services with `docker compose up --build`.

### Troubleshooting

- **Docker daemon error:** Start Docker Desktop and wait until its engine is running.
- **Port already in use:** Stop the other service using port 5173, 5000 or 27017, or change the host-side port mapping in `docker-compose.yml`.
- **Frontend cannot reach the API:** Open the frontend at `http://localhost:5173` and check that the backend health check at `http://localhost:5000/api/health` returns JSON with `"status": "ok"`.
- **Dependency changes are not reflected:** Run `docker compose up --build` to rebuild the affected image.
- **Reset local data:** `docker compose down -v` deletes the MongoDB volume as well as the containers. This cannot be undone.

> **Scope:** These Dockerfiles and Compose settings are for local development. Before production deployment, use a strong secret managed outside source control, production-appropriate images/configuration, and a deployment-specific setup.

## Local Setup (without Docker)

### 1. Clone

```bash
git clone https://github.com/vincentcibin-a11y/EduBridge.git
cd EduBridge
```

### 2. Start MongoDB

Use a local MongoDB service or MongoDB Atlas.

### 3. Start the backend

```bash
cd backend
npm install
```

Create a `.env` file from `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/edubridge
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Then:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

### Windows note

Instead of `cp .env.example .env`, you can use:

```powershell
Copy-Item .env.example .env
```

## Second Review Demo

Use two student accounts.

### Student A — Learner

1. Register and log in.
2. Update the profile with subjects and skills.
3. Create a DBMS/Java/Python doubt.
4. Open the doubt and view/post peer answers.
5. Open **Find a Tutor**.
6. Select Student B.
7. Send an offline or online tutoring request with date, time and location.

### Student B — Peer Tutor

1. Register and log in.
2. Add subjects, skills and availability.
3. Open **My Sessions**.
4. Accept or reject the incoming request.

### Student A

1. Open **My Sessions**.
2. Confirm the scheduled session.
3. Complete the session.

This demonstrates the central project workflow:

```text
Student
  ↓
Authentication
  ↓
Ask Doubt
  ↓
Peer Answer
  ↓
Find Tutor
  ↓
Tutoring Request
  ↓
Tutor Accepts
  ↓
Schedule Session
  ↓
Complete Session
```

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Current profile |
| PUT | `/api/auth/profile` | Update profile |
| GET | `/api/doubts` | List/search doubts |
| POST | `/api/doubts` | Create doubt |
| GET | `/api/doubts/:id` | View doubt |
| POST | `/api/doubts/:id/answers` | Add peer answer |
| PUT | `/api/doubts/:id/status` | Resolve/open doubt |
| GET | `/api/tutors` | Discover peer tutors |
| GET | `/api/tutors/:id` | View tutor |
| GET | `/api/bookings` | List sessions |
| POST | `/api/bookings` | Send tutoring request |
| PUT | `/api/bookings/:id/accept` | Accept request |
| PUT | `/api/bookings/:id/reject` | Reject request |
| PUT | `/api/bookings/:id/complete` | Complete session |
| GET | `/api/notifications` | List notifications |
| PUT | `/api/notifications/:id/read` | Mark one notification as read |
| PUT | `/api/notifications/read-all` | Mark all notifications as read |
| POST | `/api/reviews/booking/:bookingId` | Review a completed session |
| GET | `/api/reviews/tutor/:tutorId` | List reviews for a tutor |

## Development Roadmap

The Second Review MVP intentionally prioritizes the core workflow. Next iterations can add:

- Socket.IO real-time chat
- Academic resource sharing
- More detailed reputation and review moderation
- Admin moderation dashboard
- Additional automated tests
- Production deployment
- Enhanced college verification

## Academic Project Context

**Student:** Cibin Vincent  
**Program:** MCA  
**ID:** FIT25MCA-2028  
**Guide:** Ms. Senu Abi

## License

This project is developed as an academic MCA mini project.
