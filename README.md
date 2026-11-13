# EduBridge

**A peer-to-peer academic doubt-solving and student tutoring platform for college communities.**

EduBridge helps students ask academic questions, share peer answers, discover student tutors, schedule tutoring sessions and provide feedback after completed sessions. It is developed as an individual MCA software project to demonstrate requirements engineering, iterative development, modular design, testing, version control, documentation and deployment practices.

## Project details

- **Student:** Cibin Vincent
- **Programme:** Master of Computer Applications (MCA)
- **Institution:** Federal Institute of Science and Technology (FISAT), Angamaly
- **Course:** MCA Main Project
- **Project title:** EduBridge — Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform
- **Student ID:** FIT25MCA-2028
- **Project Guide:** Ms. Senu Abi (confirm formal assignment with the Department)
- **Repository:** https://github.com/vincentcibin-a11y/EduBridge

> Academic integrity: This repository contains implementation and documentation. Supervisor approval, stakeholder interviews, meeting attendance, sprint reviews, Board evaluations, external evaluation and production deployment must be recorded only after they actually occur. A planned schedule is not proof that an event was completed.

## 1. Real-life problem

Students often need help outside classroom hours, while academic questions and peer expertise may be scattered across informal communication channels. Learners may struggle to identify a suitable peer, arrange a session and keep track of its outcome. EduBridge provides one structured peer-learning workflow for a college community.

## 2. Objectives

1. Provide secure student registration, login and profile management.
2. Enable students to publish academic doubts and submit peer answers.
3. Help learners discover peers by subject and skill.
4. Support online/offline tutoring requests and controlled booking states.
5. Notify users about relevant academic and booking activity.
6. Collect feedback for eligible completed tutoring sessions.
7. Apply software engineering practices: requirements analysis, design, Scrum, Git, testing, documentation and deployment validation.

## 3. Users and stakeholders

| Stakeholder | Responsibility |
|---|---|
| Student / learner | Posts doubts, searches for help, requests tutoring and submits reviews |
| Peer tutor | Maintains expertise, answers doubts and responds to requests |
| Product Owner | Customer when one exists; otherwise the Internal Guide |
| Internal Guide | Faculty supervisor who guides and reviews the product |
| Scrum Master | Faculty / technical staff member appointed to monitor development |
| Project Assessment Board | Conducts interim and internal project evaluations |
| External Examiner | Conducts final external evaluation |

Record stakeholder consultations only after they occur. Include date, participant role (with consent), need, decision and resulting backlog item.

## 4. Scope

### Included in the current application
- Student registration, login and profile management
- Academic doubt creation, search, answers and resolution
- Peer tutor discovery
- Tutoring session requests and accept/reject/complete workflow
- In-app notifications
- Session ratings and reviews

### Future scope
- Real-time chat
- Study material and file sharing
- Admin moderation dashboard
- Institutional single sign-on and identity verification
- Advanced analytics and tutor matching

## 5. Technology stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Node.js, Express.js REST API |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Version control | Git and GitHub |
| Continuous integration | GitHub Actions |
| Containerization / local environment | Docker, Docker Compose |
| Testing | Node.js test runner, API/integration tests, frontend production build, manual acceptance tests |

## 6. Methodology and course schedule

Use Scrum with **five two-week sprints** within the 14-week course window. The detailed week-by-week mapping is in [Project Plan](docs/PROJECT_PLAN.md).

- Encourage short progress meetings approximately every three days; each should be less than 15 minutes.
- Conduct a sprint review and working demo at the end of each two-week sprint; each review must not exceed 30 minutes.
- Interim Project Assessment Board evaluations around Weeks 6 and 11 are separate from sprint reviews.
- Maintain the four prescribed Scrum Book parts: (i) Product Backlog, (ii) Database & UI Design, (iii) Testing & Validation, and (iv) Details of Versions.
- Record dated Product Owner / Scrum Master feedback, corrections, issues and actions.
- Apply Test Driven Development where suitable and track defects in GitHub Issues or an equivalent tool.

## 7. Architecture

The application follows a three-tier architecture:

1. **Presentation layer:** React user interface.
2. **Application layer:** Express REST API, authentication middleware and feature routes.
3. **Data layer:** MongoDB collections accessed through Mongoose models.

See [Architecture Specification](docs/ARCHITECTURE.md) for component, data and deployment views.

## 8. Main modules

| Module | Responsibility |
|---|---|
| Authentication and profiles | Account creation, login, password hashing and protected profile operations |
| Doubt solving | Publish, search, answer and resolve academic questions |
| Tutor discovery | Find peer tutors using subject/skill/profile details |
| Booking | Create requests and enforce pending/accepted/rejected/completed transitions |
| Notifications | Show event updates and read/unread state |
| Reviews | Accept eligible post-session ratings and maintain tutor feedback summaries |

## 9. Installation and execution

### Option A — Docker Compose

Requires Docker Desktop / Docker Engine with Compose.

```bash
git clone https://github.com/vincentcibin-a11y/EduBridge.git
cd EduBridge
docker compose up --build
```

Open:
- Frontend: http://localhost:5173
- API health: http://localhost:5000/api/health

Stop services:

```bash
docker compose down
```

### Option B — Local development

Requires Node.js 20+ and MongoDB local instance or MongoDB Atlas.

```bash
git clone https://github.com/vincentcibin-a11y/EduBridge.git
cd EduBridge
npm --prefix backend install
npm --prefix frontend install
```

Create `backend/.env` using `backend/.env.example`, set a private strong JWT secret and database URI, then run the backend:

```bash
npm --prefix backend run dev
```

In a second terminal:

```bash
npm --prefix frontend run dev
```

Never commit environment files, passwords, tokens or database credentials.

## 10. Testing

Run from the repository root:

```bash
npm --prefix backend test
npm --prefix frontend run build
npm run check
```

The GitHub Actions workflow runs configured automated checks and builds. See [Testing & Validation](docs/TESTING_AND_VALIDATION.md). Automated CI results do not replace manual browser acceptance tests. Record the actual command output, run date, environment and tested commit.

## 11. Git and release management

Use Git throughout development. Commit focused changes with meaningful messages and retain inspectable history. Example workflow:

```bash
git checkout -b feature/<short-name>
# implement and test a focused change
git add .
git commit -m "feat: describe the change"
git push -u origin feature/<short-name>
```

Use pull requests or reviewed commits where practical. Record actual release tags, commit SHAs and dates in the Scrum Book. Do not rewrite history to fabricate a sprint timeline.

## 12. Deployment pipeline

The repository currently provides CI and Docker build validation. **Production deployment is not claimed here.** A production release requires an approved hosting target, production database, protected secrets, HTTPS, correct CORS configuration, health checks and deployment evidence. See [Project Documentation](docs/EduBridge_Project_Documentation.md).

## 13. Academic documentation

| Document | Purpose |
|---|---|
| [Project Synopsis](docs/PROJECT_SYNOPSIS.md) | Problem, objectives, scope, stakeholders and approval record |
| [Project Plan](docs/PROJECT_PLAN.md) | 14-week schedule, two-week sprints, meetings and risks |
| [Product Backlog](docs/PRODUCT_BACKLOG.md) | User stories, priorities and acceptance criteria |
| [Architecture](docs/ARCHITECTURE.md) | Modules, data model and architecture |
| [Testing & Validation](docs/TESTING_AND_VALIDATION.md) | Test catalogue, execution log and defects |
| [Scrum Book](docs/EduBridge_Scrum_Book.md) | Four prescribed parts plus meeting/review registers |
| [Project Report](docs/EduBridge_Project_Documentation.md) | Full technical report |
| [Manual Acceptance Evidence](docs/Manual_Acceptance_Test_Evidence.md) | Browser-level test record |
| [Final Submission Checklist](docs/Final_Submission_Checklist.md) | Evidence and evaluation readiness |

## 14. Course outcome traceability

| Course outcome | EduBridge activity / evidence |
|---|---|
| CO1 — Identify a useful real-life project | Peer-learning problem, project selection justification and stakeholder context |
| CO2 — Interact with people to identify requirements | Dated consultation log, user stories and Product Owner decisions |
| CO3 — Apply a development methodology | Scrum cadence, two-week sprint plans, check-ins and sprint reviews |
| CO4 — Analyse and design the product | Requirements, architecture, ERD, UI flows and data design |
| CO5 — Test modules at various stages | Test cases, sprint regression, defect log, CI and manual test evidence |
| CO6 — Build and integrate modules | Integrated React, Express and MongoDB increments |
| CO7 — Document and deploy the product | Project report, Scrum Book, setup instructions, release and deployment evidence |

## 15. Final submission reminder

Before final evaluation, confirm synopsis approval, Product Owner and Scrum Master assignments, real stakeholder interaction records, meeting/review history, both interim evaluations, actual test results, source/report consistency and a working demonstration or deployment as required by the Department.

## License

MIT License. See [LICENSE](LICENSE).
