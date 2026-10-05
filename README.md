# EduBridge

[![EduBridge CI](https://github.com/vincentcibin-a11y/EduBridge/actions/workflows/ci.yml/badge.svg)](https://github.com/vincentcibin-a11y/EduBridge/actions/workflows/ci.yml)
[![Node 20](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

> **MCA Mini Project · Full-stack peer-to-peer academic doubt solving and student tutoring platform**

EduBridge helps college students learn from one another. A student can ask an academic doubt, receive peer answers, discover a knowledgeable tutor, request a session, complete it, and leave a review.

## ✨ Core workflow

`Register → Profile → Ask Doubt → Peer Answer → Find Tutor → Request Session → Accept/Reject → Complete → Review`

### Highlights

- 🔐 JWT authentication with bcrypt password hashing
- 👤 Student profiles with subjects, skills and availability
- 💬 Academic doubt board with search and peer answers
- 🔎 Tutor discovery by name, subject and skill
- 📅 Online/offline tutoring requests with scheduling
- 🔔 In-app notifications for answers and booking updates
- ⭐ Session completion, reputation points and 1–5 tutor reviews
- 🛡️ Protected REST APIs, validation, ownership checks and security headers
- 🧪 Automated API + MongoDB integration tests
- 🐳 Docker Compose development environment
- ⚙️ GitHub Actions CI for syntax checks, tests, Docker builds and frontend builds

## 🏗️ Architecture

```text
┌──────────────────────┐
│ React 18 + Vite      │
│ Responsive UI        │
└──────────┬───────────┘
           │ Axios / REST
           ▼
┌──────────────────────┐
│ Express.js API       │
│ JWT + validation     │
│ Auth / Doubts /      │
│ Tutors / Bookings /  │
│ Notifications /      │
│ Reviews              │
└──────────┬───────────┘
           │ Mongoose
           ▼
┌──────────────────────┐
│ MongoDB 7            │
│ Persistent data      │
└──────────────────────┘
```

## 🧰 Technology stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios, Lucide React |
| Backend | Node.js 20, Express.js |
| Database | MongoDB 7, Mongoose |
| Authentication | JWT, bcryptjs |
| Styling | Responsive CSS |
| DevOps | Docker, Docker Compose, GitHub Actions |
| Testing | Node.js test runner, HTTP/API integration tests |
| Version control | Git, GitHub |

## 🚀 Quick start

### Option A — Docker Compose

Prerequisite: Docker Desktop or Docker Engine with Compose.

```bash
git clone https://github.com/vincentcibin-a11y/EduBridge.git
cd EduBridge
```

Create a root `.env` file:

```env
JWT_SECRET=replace-with-a-long-random-development-secret
```

Then:

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:5173
- API health: http://localhost:5000/api/health

Stop:

```bash
docker compose down
```

Reset the development database:

```bash
docker compose down -v
```

### Option B — Run without Docker

Start MongoDB, then:

```bash
cd backend
npm ci
# create backend/.env from backend/.env.example
npm run dev
```

In another terminal:

```bash
cd frontend
npm ci
npm run dev
```

## 🧪 Testing

Backend automated tests:

```bash
cd backend
npm ci
npm test
```

Frontend production build:

```bash
cd frontend
npm ci
npm run build
```

CI also validates Docker Compose configuration, builds both images, checks backend JavaScript syntax, runs the backend test suite and builds the frontend.

> CI is not a substitute for browser acceptance testing. Record real manual results in the academic test documentation.

## 🔌 API overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET/PUT | `/api/auth/profile` | Read/update profile |
| GET/POST | `/api/doubts` | List/create doubts |
| GET | `/api/doubts/:id` | View doubt |
| POST | `/api/doubts/:id/answers` | Add peer answer |
| PUT | `/api/doubts/:id/status` | Resolve/reopen doubt |
| GET | `/api/tutors` | Discover tutors |
| GET | `/api/tutors/:id` | View tutor |
| GET/POST | `/api/bookings` | View/create sessions |
| PUT | `/api/bookings/:id/accept` | Accept request |
| PUT | `/api/bookings/:id/reject` | Reject request |
| PUT | `/api/bookings/:id/complete` | Complete session |
| GET/PUT | `/api/notifications` | Manage notifications |
| POST | `/api/reviews/booking/:bookingId` | Submit review |
| GET | `/api/reviews/tutor/:tutorId` | View tutor reviews |

## 📚 Academic documentation

- [Project Documentation](docs/EduBridge_Project_Documentation.md)
- [Scrum Book](docs/EduBridge_Scrum_Book.md)
- [Manual Acceptance Test Evidence](docs/Manual_Acceptance_Test_Evidence.md)
- [Final Submission Checklist](docs/Final_Submission_Checklist.md)
- [Screenshot Evidence Guide](docs/evidence/README.md)

## 🔒 Security

- Secrets are excluded from Git through `.gitignore`.
- Passwords are hashed with bcrypt.
- JWT authentication protects application APIs.
- User-owned resources enforce authorization checks.
- Request bodies have a 1 MB limit.
- API responses use no-store caching.
- Basic browser security headers are enabled.
- CORS is restricted to configured development origins.
- Production startup rejects missing or weak JWT secrets.

See [SECURITY.md](SECURITY.md) for responsible disclosure guidance.

## 🎓 Academic context

**Student:** Cibin Vincent  
**Program:** MCA  
**Project:** EduBridge — Peer-to-Peer Academic Doubt Solving & Student Tutoring Platform

## 📌 Project status

**MVP complete for the core learner-to-tutor workflow.**

Potential future enhancements include real-time chat, resource sharing, stronger college verification, moderation tooling, richer analytics and production deployment.

---

If you are evaluating this repository, the fastest demonstration is:

1. Register two students.
2. Add subjects/skills to the second student.
3. Create a doubt from the first student.
4. Answer it from the second student.
5. Request a tutoring session.
6. Accept it from the tutor account.
7. Complete the session.
8. Submit the learner review.
