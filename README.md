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
- Session completion and basic reputation points
- Responsive React student dashboard
- MongoDB/Mongoose persistence
- Protected Express REST APIs
- In-app notifications for doubt answers and tutoring-request updates

### Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| Styling | Responsive CSS |
| Version Control | Git + GitHub |

## Project Structure

```text
EduBridge/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Doubt.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── doubts.js
│   │   ├── tutors.js
│   │   └── bookings.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

## Local Setup

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

## Development Roadmap

The Second Review MVP intentionally prioritizes the core workflow. Next iterations can add:

- Socket.IO real-time chat
- Academic resource sharing
- Ratings and detailed reputation
- Admin moderation dashboard
- Automated tests
- Production deployment
- Enhanced college verification

## Academic Project Context

**Student:** Cibin Vincent  
**Program:** MCA  
**ID:** FIT25MCA-2028  
**Guide:** Ms. Senu Abi

## License

This project is developed as an academic MCA mini project.
