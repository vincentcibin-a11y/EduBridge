# EduBridge Architecture Specification

## 1. Overview

EduBridge is a three-tier web application for student peer learning. The React frontend presents doubt-sharing, tutor-discovery and session workflows. The Express backend exposes REST APIs and applies validation, authentication, authorisation and business rules. MongoDB stores the application data through Mongoose models.

```mermaid
flowchart TD
    U[Student / Browser] --> FE[React 18 + Vite Frontend]
    FE -->|Axios REST / JSON| API[Node.js + Express API]
    API --> MW[Validation / JWT / Authorization Middleware]
    MW --> R[Feature Routes]
    R --> DB[Mongoose ODM]
    DB --> M[(MongoDB)]
    R --> AUTH[Auth and Profiles]
    R --> D[Doubts and Answers]
    R --> T[Tutor Search]
    R --> B[Bookings]
    R --> N[Notifications]
    R --> RV[Reviews]
```

## 2. Component design

### 2.1 Presentation layer — frontend

The React client provides:
- Registration and login.
- Student dashboard and profile.
- Academic doubt listing, creation, search and answer threads.
- Tutor discovery and tutor profile.
- Tutoring session requests and booking status management.
- Notifications and read-state controls.
- Review submission for completed sessions.

The frontend calls the backend through Axios. Client-side validation improves usability; server-side validation remains authoritative.

### 2.2 Application layer — backend

The Node.js/Express API validates requests, verifies JWTs, checks resource ownership and applies application rules.

| Component | Responsibility |
|---|---|
| `backend/server.js` | Server startup and database connection |
| `backend/app.js` | Express application, common middleware and route registration |
| `backend/middleware/auth.js` | JWT verification and authenticated user context |
| `backend/middleware/rateLimiter.js` | Request rate limiting |
| `backend/routes/auth.js` | Registration, login and profile |
| `backend/routes/doubts.js` | Doubt listing, creation, answers and status |
| `backend/routes/tutors.js` | Peer tutor discovery |
| `backend/routes/bookings.js` | Tutoring request lifecycle |
| `backend/routes/notifications.js` | User-specific notifications |
| `backend/routes/reviews.js` | Review eligibility and tutor feedback |

### 2.3 Data layer — MongoDB

Mongoose models define the persistent documents.

| Model | Purpose |
|---|---|
| User | Account, profile, subject/skill details and rating summary |
| Doubt | Academic question, tags, status and embedded answers |
| Booking | Learner/tutor session request and state |
| Notification | Recipient, event content and read flag |
| Review | Booking-linked rating and feedback |

## 3. Logical data relationships

```mermaid
erDiagram
    USER ||--o{ DOUBT : authors
    USER ||--o{ BOOKING : learner
    USER ||--o{ BOOKING : tutor
    USER ||--o{ NOTIFICATION : receives
    USER ||--o{ REVIEW : participates
    DOUBT ||--o{ ANSWER : contains
    BOOKING ||--o| REVIEW : has

    USER {
      ObjectId _id
      string name
      string email
      string password
      string college
      string course
      string semester
      string bio
      array subjects
      array skills
      string availability
      number reputation
      number ratingAverage
      number ratingCount
    }
    DOUBT {
      ObjectId _id
      ObjectId author
      string title
      string description
      string subject
      array tags
      string status
      array answers
    }
    BOOKING {
      ObjectId _id
      ObjectId learner
      ObjectId tutor
      string subject
      string date
      string time
      string mode
      string status
    }
    NOTIFICATION {
      ObjectId _id
      ObjectId recipient
      string type
      string title
      string message
      boolean read
    }
    REVIEW {
      ObjectId _id
      ObjectId booking
      ObjectId learner
      ObjectId tutor
      number rating
      string feedback
    }
```

Doubt answers are embedded subdocuments, not a separate collection. Verify exact model fields and indexes against the final Mongoose schemas before submission.

## 4. Main application workflows

### 4.1 Doubt-solving workflow

```mermaid
flowchart TD
    A[Student logs in] --> B[Create academic doubt]
    B --> C[Peer searches and views doubt]
    C --> D[Peer posts answer]
    D --> E[Question author reviews answer]
    E --> F[Author marks doubt resolved]
```

### 4.2 Tutoring workflow

```mermaid
stateDiagram-v2
    [*] --> Pending: Learner creates request
    Pending --> Accepted: Assigned tutor accepts
    Pending --> Rejected: Assigned tutor rejects
    Accepted --> Completed: Permitted participant completes
    Completed --> [*]: Eligible learner posts review
    Rejected --> [*]
```

## 5. Security and validation boundaries

- Passwords are hashed with bcryptjs.
- Protected APIs use JWT authentication.
- Resource ownership is checked for user-specific operations.
- Booking decisions and completion follow explicit state rules.
- Review submission is restricted to eligible completed bookings.
- Request types, lengths and database identifiers are validated server-side.
- Rate limiting and defensive response headers are configured in the API.
- Production JWT secrets and database credentials must be injected through protected environment settings, never committed to source control.

## 6. Git, testing and delivery pipeline

```mermaid
flowchart TD
    DEV[Developer change] --> GIT[Git commit / GitHub]
    GIT --> CI[GitHub Actions]
    CI --> C1[Compose configuration check]
    CI --> C2[Backend syntax and tests]
    CI --> C3[MongoDB CI service]
    CI --> C4[Frontend production build]
    CI --> IMG[Docker image build]
    IMG --> READY[Validated build]
    READY --> DEPLOY[Approved deployment stage — proposed]
    DEPLOY --> HEALTH[Health / smoke test]
```

The repository currently provides continuous integration and Docker image build validation. The deployment stage in this diagram is proposed; it is not a claim that production deployment is automated or completed.

## 7. Deployment requirements

Before a public production deployment:
1. Select and approve the hosting provider.
2. Configure a production MongoDB database and strong JWT secret through protected environment variables.
3. Configure the frontend origin and CORS.
4. Enable HTTPS and suitable logging/backup practices.
5. Deploy the exact validated commit or release tag.
6. Run the API health check and critical smoke tests.
7. Record deployed URL, date, commit SHA, logs and rollback plan.

## 8. Course outcome traceability

| Course outcome | Architecture / engineering evidence |
|---|---|
| CO1 — Real-life project selection | Peer-learning problem statement and stakeholder context |
| CO2 — Requirements discovery | Actual learner/tutor and guide consultation records |
| CO3 — Development methodology | Five two-week Scrum increments, check-ins and reviews |
| CO4 — Analysis and design | Requirements, architecture, ERD and UI design |
| CO5 — Module testing | API/integration tests, regression runs, manual acceptance and CI |
| CO6 — Build and integration | Integrated React, Express and MongoDB modules |
| CO7 — Documentation and deployment | Synopsis, report, Scrum Book, version register and deployment evidence |
