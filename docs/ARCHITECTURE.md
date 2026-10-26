# EduBridge Architecture Specification

## 1. Overview & System Context

EduBridge is a modular three-tier web application designed for academic doubt solving and peer tutoring across college campuses.

```mermaid
flowchart TD
    subgraph ClientLayer["Frontend Client (React 18 + Vite)"]
        UI["Accessible Responsive UI (WCAG 2.1 AA)"]
        State["Client State & Routing (React Router 7)"]
        AxiosClient["Axios HTTP Client + JWT Interceptor"]
        UI --> State --> AxiosClient
    end

    subgraph APILayer["Backend API Gateway (Express 4 / Node.js 20)"]
        SecurityMW["Security Headers + CORS + Rate Limiter"]
        AuthMW["JWT Bearer Authentication Middleware"]
        Controllers["Resource Controllers"]
        
        subgraph Endpoints["Route Controllers"]
            AuthR["/api/auth"]
            DoubtsR["/api/doubts"]
            TutorsR["/api/tutors"]
            BookingsR["/api/bookings"]
            NotifsR["/api/notifications"]
            ReviewsR["/api/reviews"]
        end
        
        SecurityMW --> AuthMW --> Controllers
        Controllers --> Endpoints
    end

    subgraph DataLayer["Persistence Layer (MongoDB 7)"]
        MongooseODM["Mongoose ODM (Schema & Validation)"]
        Collections[("Collections: Users, Doubts, Bookings, Notifications, Reviews")]
        MongooseODM --> Collections
    end

    AxiosClient -- "HTTPS / JSON + Bearer Token" --> SecurityMW
    Endpoints --> MongooseODM
```

---

## 2. Component Design

### 2.1 Frontend Architecture (`frontend/`)
The frontend client provides responsive, accessible interfaces built with React 18:
- **Authentication**: JWT login, registration, college profile onboarding.
- **Academic Doubt Board**: Create questions, search by tags and keywords, post peer answers, and mark questions resolved.
- **Tutor Discovery**: Discover peer tutors by subject, skill tags, reputation score, and rating averages.
- **Session Management**: Send session requests (online/offline), accept/reject incoming bookings, mark sessions completed.
- **Activity & Notifications**: Real-time unread activity counters, instant mark-as-read, and deep links.
- **Session Reviews**: Post-completion rating (1–5 stars) and qualitative feedback.
- **Accessibility Engine**: Semantic HTML5 landmarks, ARIA live regions, keyboard focus traps, skip-to-content links, and responsive navigation.

### 2.2 Backend Architecture (`backend/`)
The Express application implements a RESTful service structure:
- `middleware/rateLimiter.js`: In-memory rate limiting to protect authentication routes from brute force and mitigate denial-of-service attempts.
- `middleware/auth.js`: Cryptographic JWT verification and user context hydration.
- `routes/auth.js`: Registration, bcrypt hashing, credential authentication, and profile mutations.
- `routes/doubts.js`: Academic question publishing, regex-escaped queries, peer answer threads, and status updates.
- `routes/tutors.js`: Tutor index with fuzzy subject/skill filtering and reputation ranking.
- `routes/bookings.js`: Finite state machine managing booking lifecycle:
  ```mermaid
  stateDiagram-v2
      [*] --> Pending: Learner requests session
      Pending --> Accepted: Tutor accepts request
      Pending --> Rejected: Tutor rejects request
      Accepted --> Completed: Either party marks session completed
      Completed --> [*]: Learner submits review
  ```
- `routes/notifications.js`: Inbox event stream and read receipt updates.
- `routes/reviews.js`: Post-session evaluation, duplicate review prevention, and incremental tutor rating aggregation.

---

## 3. Data Model & Entity Relationships

```mermaid
erDiagram
    USER ||--o{ DOUBT : "authors"
    USER ||--o{ BOOKING : "participates as learner"
    USER ||--o{ BOOKING : "participates as tutor"
    USER ||--o{ REVIEW : "writes/receives"
    USER ||--o{ NOTIFICATION : "receives"
    DOUBT ||--o{ ANSWER : "contains"
    BOOKING ||--o| REVIEW : "rated via"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string college
        string course
        string semester
        string bio
        array skills
        array subjects
        string availability
        number reputation
        number ratingAverage
        number ratingCount
        string role
        date createdAt
    }

    DOUBT {
        ObjectId _id PK
        string title
        string description
        string subject
        array tags
        string status
        ObjectId author FK
        array answers
        date createdAt
    }

    BOOKING {
        ObjectId _id PK
        ObjectId learner FK
        ObjectId tutor FK
        string subject
        string mode
        string date
        string time
        string location
        string notes
        string status
        boolean reviewedByLearner
        date createdAt
    }

    REVIEW {
        ObjectId _id PK
        ObjectId booking FK,UK
        ObjectId learner FK
        ObjectId tutor FK
        number rating
        string feedback
        date createdAt
    }

    NOTIFICATION {
        ObjectId _id PK
        ObjectId recipient FK
        string type
        string title
        string message
        string link
        boolean read
        date createdAt
    }
```

---

## 4. Security & Compliance Boundaries

1. **Authentication & Secret Safety**:
   - Passwords salted and hashed with `bcryptjs`.
   - JWT tokens signed with a cryptographically enforced secret (`>= 32` characters in production).
   - `.env` excluded from version control; templates documented in `.env.example`.
2. **Defensive Validation**:
   - Maximum payload bounds (1 MB request size limit).
   - Input type, string length, and format enforcement on all endpoints.
   - ReDoS protection via strict query regex escaping (`escapeRegex`).
3. **Authorization & Role Integrity**:
   - Booking transitions verified against learner/tutor object IDs.
   - Review creation restricted to the verified learner of a completed session.
   - Notifications restricted to the target recipient.
4. **Transport & Network Controls**:
   - Controlled CORS origin white-listing.
   - HTTP response hardening (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `Cache-Control: no-store`).
   - Rate limiting on sensitive endpoints.

---

## 5. DevOps & Continuous Integration Pipeline

GitHub Actions executes the automated quality pipeline on every push and pull request:
1. Validates `docker-compose.yml` structure.
2. Builds frontend and backend Docker container images.
3. Installs dependencies using `npm ci`.
4. Performs AST syntax validation across all backend JavaScript modules (`node --check`).
5. Executes automated unit and integration tests against a live MongoDB 7 service container.
6. Builds the production frontend bundle using Vite (`vite build`).
