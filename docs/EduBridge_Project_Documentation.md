# EduBridge — MCA Mini Project Documentation

**Project title:** EduBridge – A Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform  
**Student:** Cibin Vincent  
**Programme:** MCA  
**Student ID:** FIT25MCA-2028  
**Project Guide:** Ms. Senu Abi  
**Institution:** Federal Institute of Science and Technology (FISAT), Angamaly  
**Repository:** https://github.com/vincentcibin-a11y/EduBridge

> This document describes the project and its current MVP scope. Verify screenshots, exact schema fields, test results, dates, and guide approvals against the final repository and actual demonstrations before submission.

## Abstract
EduBridge is a college-focused peer-learning web application intended to connect students who need academic help with peers who can explain concepts or provide tutoring. Students can create academic doubts, search questions, post answers, discover tutors by subject and skill, request online or offline sessions, manage tutoring requests, receive in-app notifications, and review completed sessions. The system uses React and Vite for the frontend, Node.js and Express for the backend, MongoDB with Mongoose for persistence, and JWT-based authentication with bcrypt password hashing. The project applies an iterative Scrum approach and uses GitHub for source control and continuous integration.

## 1. Introduction
Students often need timely explanations beyond formal classroom hours. Finding a suitable peer who understands a particular subject can be difficult when questions, peer expertise, and tutoring arrangements are spread across informal chats and separate tools. EduBridge brings doubt solving and peer tutoring into one college-oriented platform.

### 1.1 Problem statement
Students need a convenient way to post academic doubts, receive peer answers, identify knowledgeable classmates, and coordinate tutoring sessions with clear request statuses.

### 1.2 Objectives
- Provide secure student registration and login.
- Allow students to maintain profiles, subjects, skills, and availability.
- Support academic doubt creation, search, and answers.
- Help learners discover peer tutors.
- Support online/offline tutoring requests and session state changes.
- Provide notifications for relevant application events.
- Collect ratings and feedback after completed sessions.
- Maintain a version-controlled, testable full-stack application.

### 1.3 Scope
The current MVP focuses on the student-to-student academic support workflow. Real-time chat, resource sharing, advanced administration, and production deployment are possible future enhancements.

## 2. Course and project approach
The project is developed for the MCA Mini Project course. Work is organized as incremental deliverables with a product backlog, design records, testing records, and version history.

### 2.1 Scrum practices
- Organize work into approximately two-week sprints.
- Review the increment every two weeks.
- Keep sprint reviews within 30 minutes.
- Demonstrate the increment to the Project Guide/Product Owner at each review.
- Hold brief progress meetings approximately once every three days where practical.
- Record actual dates, feedback, action items, and evidence in the Scrum Book.

### 2.2 Learning outcomes / evidence mapping
| Project activity | Evidence |
|---|---|
| Requirements and planning | Product backlog and acceptance criteria |
| System design | Architecture, data model, and UI screen register |
| Implementation | Repository source code and commit history |
| Validation | Executed test cases, defect log, CI output |
| Iterative development | Sprint plans, reviews, and feedback records |
| Final reporting | This document and the Scrum Book |

## 3. Feasibility and requirements

### 3.1 Technical feasibility
The application uses a JavaScript-based stack and widely used open-source frameworks. MongoDB stores application records, and the frontend communicates with the backend through REST APIs. Docker Compose is available for local development.

### 3.2 Functional requirements
1. Users can register and log in.
2. Users can view and update their profiles.
3. Users can create and search academic doubts.
4. Users can post answers to doubts.
5. Users can search for peer tutors by relevant details.
6. Learners can request tutoring sessions in online or offline mode.
7. Tutors can accept or reject pending requests.
8. Accepted sessions can be completed.
9. Users can view and manage notifications.
10. Learners can review a completed session, subject to one-review-per-booking validation.

### 3.3 Non-functional requirements
- **Security:** Password hashing, JWT-protected routes, input validation, and safe error responses.
- **Usability:** Responsive screens and clear action/status feedback.
- **Maintainability:** Separate frontend, backend, models, middleware, and routes.
- **Reliability:** Validate booking transitions and prevent duplicate review/completion operations.
- **Portability:** Support local development with Docker Compose or a local Node/MongoDB setup.
- **Performance:** Limit search/list responses and validate query inputs.

### 3.4 User roles
- **Student/Learner:** Posts doubts, answers questions, searches tutors, requests sessions, and submits reviews.
- **Peer Tutor:** Maintains skills and availability, responds to tutoring requests, and conducts sessions.
- **Administrator:** Advanced moderation is a future enhancement unless an admin role is implemented in the final code.

## 4. System design

### 4.1 Architecture
The React frontend provides the user interface and calls the Express REST API using Axios. The backend validates requests, checks authentication/authorization, applies business rules, and reads/writes MongoDB through Mongoose models.

```text
Student browser
     |
React + Vite UI
     |
Axios / REST API
     |
Node.js + Express
     |-- Authentication and authorization
     |-- Doubt and answer routes
     |-- Tutor and booking routes
     |-- Notification and review routes
     |
MongoDB + Mongoose
```

### 4.2 Technology stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios |
| UI | Responsive CSS, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, bcryptjs |
| Source control | Git, GitHub |
| CI | GitHub Actions |
| Local deployment | Docker, Docker Compose |

### 4.3 Data model overview
| Collection | Purpose |
|---|---|
| User | Authentication identity and student profile, skills, subjects, availability, rating summary |
| Doubt | Academic question, subject, tags, author, status, answers |
| Booking | Learner/tutor references, requested date/time, mode, location/notes, status, review state |
| Notification | Recipient, message/type, related item, read status |
| Review | Completed booking reference, learner, tutor, rating, optional feedback |

Confirm exact field names and cardinality against the final Mongoose model files.

#### 4.3.1 Entity-relationship diagram

The following logical ERD reflects the repository's Mongoose models. Answers are embedded subdocuments within a Doubt, not a separate MongoDB collection. Confirm the diagram against the final model files before submission.

~~~mermaid
erDiagram
    USER ||--o{ DOUBT : authors
    USER ||--o{ ANSWER : writes
    DOUBT ||--o{ ANSWER : contains
    USER ||--o{ BOOKING : learner
    USER ||--o{ BOOKING : tutor
    USER ||--o{ NOTIFICATION : receives
    BOOKING ||--o| REVIEW : "has at most one"

    USER {
        ObjectId _id
        string name
        string email
        string password
        string college
        string course
        string semester
        string bio
        string[] skills
        string[] subjects
        string availability
        number reputation
        number ratingAverage
        number ratingCount
        string role
    }
    DOUBT {
        ObjectId _id
        ObjectId author
        string title
        string description
        string subject
        string[] tags
        string status
    }
    ANSWER {
        ObjectId user
        string content
        date createdAt
    }
    BOOKING {
        ObjectId _id
        ObjectId learner
        ObjectId tutor
        string subject
        string mode
        string date
        string time
        string status
        boolean reviewedByLearner
    }
    NOTIFICATION {
        ObjectId _id
        ObjectId recipient
        string type
        string title
        string message
        string link
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
~~~

**Relationship notes:** The Review booking reference is unique, so a booking has at most one review. Doubt answers are stored as subdocuments, each with a reference to its author. User ratingAverage and ratingCount are denormalized summary fields maintained by the review workflow.

#### 4.3.2 Requirements traceability

Use this matrix to connect requirements to implementation and test evidence. “Automated coverage” describes the tests currently visible in the repository; it does not imply that every edge case is covered.

| ID | Requirement | Implementation reference | Current verification / evidence |
|---|---|---|---|
| FR-01 | Register and log in securely | POST /api/auth/register, POST /api/auth/login | Integration test covers registration and login; record local run if performed. |
| FR-02 | View and update profile | GET/PUT /api/auth/profile | Manual profile update test still needs to be recorded. |
| FR-03 | Create and answer doubts; change status | /api/doubts, /api/doubts/:id/answers, /api/doubts/:id/status | Integration test covers create, answer and resolve; search edge cases need separate evidence. |
| FR-04 | Search peer tutors | GET /api/tutors | Perform and record name, subject and skill searches locally. |
| FR-05 | Request and manage tutoring | /api/bookings and accept/reject/complete routes | Integration test covers request, accept and completion; record rejection and invalid-state tests. |
| FR-06 | View and mark notifications read | /api/notifications | Automated malformed-ID check exists; successful read/read-all workflow needs evidence. |
| FR-07 | Review a completed session | POST /api/reviews/booking/:bookingId, GET /api/reviews/tutor/:tutorId | Integration test covers review, tutor summary and duplicate-review rejection. |
| FR-08 | Run repeatable build/validation checks | .github/workflows/ci.yml, Docker Compose | Retain the successful CI run URL and local Docker startup/health-check evidence. |



### 4.4 Main workflow
1. Student registers or logs in.
2. Student completes profile information.
3. Student posts a doubt or searches existing doubts.
4. Peers post answers.
5. Learner searches for a tutor by name, subject, or skill.
6. Learner submits an online/offline tutoring request for a future date and time.
7. Tutor accepts or rejects the pending request.
8. Accepted session is completed after tutoring.
9. Learner submits a rating and optional feedback.
10. Tutor rating summary is updated and users can view relevant notifications.

### 4.5 UI screens
- Register and login
- Student dashboard
- Profile and skills/subjects
- Doubt list/search
- Doubt details and answer form
- Find a Tutor
- My Sessions
- Review form
- Notifications

Add screenshots captured from the final running version.

## 5. Module descriptions

### 5.1 Authentication and profile
Registration and login provide account access. Passwords are hashed; authenticated endpoints use JWT-based access control. Profile fields allow students to describe subjects, skills, and availability.

### 5.2 Doubt solving
Students create academic doubts and browse/search questions. A doubt detail view supports peer answers and status management. Server-side validation and bounded searches reduce invalid input and unsafe search patterns.

### 5.3 Tutor discovery
Students can search peer tutors using relevant profile information. Tutor cards expose rating summaries where available to help users understand previous feedback.

### 5.4 Booking and session management
A learner sends a tutoring request with session details. The tutor can accept or reject a pending request. Validation prevents self-booking, past dates, and invalid state transitions. Accepted sessions can be marked complete once.

### 5.5 Notifications
In-app notifications inform users about relevant events such as answers and tutoring-request updates. Users can mark individual notifications or all notifications as read.

### 5.6 Ratings and reviews
After a booking is completed, the learner can submit a 1–5 rating and optional feedback. The backend checks booking ownership and completion status and prevents duplicate reviews. Tutor average rating and rating count are updated.

## 6. API overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET / PUT | `/api/auth/profile` | Read/update profile |
| GET / POST | `/api/doubts` | List/search or create doubts |
| GET | `/api/doubts/:id` | View a doubt |
| POST | `/api/doubts/:id/answers` | Add answer |
| PUT | `/api/doubts/:id/status` | Update doubt status |
| GET | `/api/tutors` | Discover tutors |
| GET | `/api/tutors/:id` | View tutor profile |
| GET / POST | `/api/bookings` | List sessions or create request |
| PUT | `/api/bookings/:id/accept` | Accept request |
| PUT | `/api/bookings/:id/reject` | Reject request |
| PUT | `/api/bookings/:id/complete` | Complete session |
| GET | `/api/notifications` | List notifications |
| PUT | `/api/notifications/:id/read` | Mark one as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| POST | `/api/reviews/booking/:bookingId` | Review completed session |
| GET | `/api/reviews/tutor/:tutorId` | List tutor reviews |

Check the current route files before treating this table as the final API contract.

## 7. Implementation and setup

### 7.1 Prerequisites
- Git
- Node.js and npm, or Docker with Compose
- MongoDB locally or through an approved remote instance

### 7.2 Recommended Docker setup
Clone the repository and run from its root:

```bash
git clone https://github.com/vincentcibin-a11y/EduBridge.git
cd EduBridge
docker compose up --build
```

Open the frontend at `http://localhost:5173` and check the API health endpoint at `http://localhost:5000/api/health`.

### 7.3 Local setup without Docker
Backend terminal:

```bash
cd backend
npm install
```

Create `backend/.env` using the project’s example configuration:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/edubridge
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npm run dev
```

Frontend terminal:

```bash
cd frontend
npm install
npm run dev
```

Use a strong private JWT secret for the environment. Never commit `.env` files, passwords, tokens, or database credentials.

## 8. Testing and validation

Testing should cover authentication, profile validation, doubt creation/search/answers, tutor discovery, booking rules, notification read state, review creation, and frontend build.

Run backend checks from `backend/` with `npm test`. The current test suite includes API-level tests and a MongoDB-backed integration workflow. The integration suite requires a reachable test database; CI provides a dedicated MongoDB service. Record the actual local command output and do not copy CI success as proof that manual browser acceptance testing has been completed.

| Test area | Key validation |
|---|---|
| Authentication | Valid registration/login; invalid fields/password; protected API |
| Doubts | Create/search/view/answer; invalid IDs and search input |
| Tutor search | Name/subject/skill search and rating summary |
| Booking | Future date; online/offline mode; self-booking rejection; valid state transitions |
| Notifications | List, mark one read, mark all read |
| Reviews | Completed booking required; valid rating; duplicate review rejected |
| Build/CI | Backend JavaScript syntax checks and frontend production build |

**Testing record:** Insert actual test date, environment, expected/actual result, pass/fail, and evidence. Do not report planned tests as passed.

CI workflow: https://github.com/vincentcibin-a11y/EduBridge/actions

## 9. Security and privacy
- Store password hashes, not plaintext passwords.
- Keep JWT secrets outside source control and require a secure secret in production.
- Validate user input and MongoDB identifiers on the server.
- Protect routes that expose user-specific or review data.
- Enforce ownership and role/state checks before changing bookings or creating reviews.
- Limit request body size and return safe error messages.
- Avoid storing unnecessary personal information; use only appropriate test data in demos.
- Before public deployment, review CORS, HTTPS, logging, rate limiting, backups, and production configuration.

## 10. Current status, limitations, and future work

### 10.1 Current MVP scope
The repository README describes the core learner-to-tutor workflow, including authentication, profiles, doubts and answers, tutor search, bookings, notifications, session completion, and ratings/reviews. Use a live demo and current repository state to confirm each feature before the final review.

### 10.2 Limitations
- Real-time chat is not part of the current MVP.
- Resource sharing and advanced moderation are future enhancements.
- Testing coverage should be expanded and documented with actual results.
- College identity verification and production deployment need additional work.
- Tutor matching can be improved with richer availability and subject filters.

### 10.3 Future enhancements
- Socket.IO real-time chat
- Academic notes/resource sharing
- Admin moderation dashboard and report handling
- Stronger college email/identity verification
- More automated unit, integration, and end-to-end tests
- Deployment with HTTPS, monitoring, and backup procedures
- Calendar integration and more detailed availability management

## 11. Conclusion
EduBridge demonstrates a full-stack peer-learning workflow that brings academic doubt solving and peer tutoring into one application. The MVP connects doubt sharing, tutor discovery, session requests, notifications, and post-session feedback. Further testing, design evidence, guide review records, and deployment hardening can improve the reliability and completeness of the final submission.

## References
1. EduBridge source repository: https://github.com/vincentcibin-a11y/EduBridge
2. React documentation: https://react.dev/
3. Vite documentation: https://vite.dev/
4. Express documentation: https://expressjs.com/
5. MongoDB documentation: https://www.mongodb.com/docs/
6. Mongoose documentation: https://mongoosejs.com/docs/
7. JSON Web Tokens: https://jwt.io/introduction
8. GitHub Actions documentation: https://docs.github.com/actions

## Final submission checklist
- [ ] Verify all content against the final source code.
- [ ] Add the ER diagram and architecture diagram.
- [ ] Add screenshots from the final running application.
- [ ] Record actual testing outcomes and attach evidence.
- [ ] Update Scrum Book with real sprint dates, reviews, meetings, and guide feedback.
- [ ] Add actual release/commit references.
- [ ] Obtain guide review and follow the department’s submission format.
