# Project Synopsis — EduBridge

## MCA Main Project

**Title:** EduBridge — Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform  
**Student:** Cibin Vincent  
**Programme:** Master of Computer Applications (MCA)  
**Institution:** Federal Institute of Science and Technology (FISAT), Angamaly  
**Student ID:** FIT25MCA-2028  
**Internal Guide:** Ms. Senu Abi (confirm formal assignment with the Department)  
**External Customer / Guide:** To be entered if a customer is formally identified  
**Submission / approval date:** To be recorded by the Department

## 1. Introduction

EduBridge is a web-based peer-learning platform for college communities. It connects students who need academic assistance with peers who can explain concepts or provide structured tutoring. It combines academic doubt sharing, peer answers, tutor discovery, session scheduling, notifications and post-session feedback.

## 2. Real-life problem statement

Students frequently need clarification outside scheduled classroom hours. Relevant peer expertise and academic questions may be distributed across informal messaging groups and personal contacts. A learner may not know which peer has knowledge of a particular subject, and arranging a tutoring session or tracking its outcome can become difficult.

EduBridge addresses this problem by providing a common platform where students can publish questions, discover peers by academic subject and skill, request tutoring sessions and review completed sessions. The project is relevant to educational institutions because it supports collaborative learning and helps organise peer assistance.

## 3. Objectives

1. Develop secure student registration and authentication.
2. Allow students to maintain academic profiles, skills, subjects and availability.
3. Enable academic doubt creation, search, answering and resolution.
4. Provide tutor discovery using subject and skill information.
5. Support structured tutoring requests with online/offline modes and controlled status transitions.
6. Notify users about relevant peer-learning and booking events.
7. Collect feedback for eligible completed sessions.
8. Apply software engineering practices: requirements analysis, modular design, Scrum, version control, testing, documentation and deployment validation.

## 4. Scope

### 4.1 Included
- Student registration and login.
- Student profile management.
- Academic doubt board, search, answers and resolution.
- Peer tutor discovery.
- Tutoring session requests and accept/reject/complete workflow.
- In-app notifications.
- Ratings and reviews for completed sessions.

### 4.2 Excluded / future scope
- Real-time chat.
- Study material uploads and resource exchange.
- Administrator moderation dashboard.
- Institutional identity verification / single sign-on.
- Advanced analytics and recommendation engine.

These are future enhancements unless included in a later approved backlog and implemented.

## 5. Stakeholders and requirements discovery

| Stakeholder | Interest / responsibility | Discovery approach |
|---|---|---|
| Student learner | Ask doubts and receive peer support | Interview / questionnaire / feedback session |
| Peer tutor | Answer questions and provide tutoring | Interview / workflow discussion |
| Internal Guide | Academic scope and evaluation | Guide discussion and review |
| Product Owner | Clarifies needs and acceptance criteria | Customer where one exists; otherwise Internal Guide |
| Scrum Master | Monitors development and removes blockers | Short progress meetings approximately every three days |
| Project Assessment Board | Interim and final internal assessment | Formal evaluations |

**Requirements interaction log — complete only after interaction:**

| Date | Participant role (with consent) | Need / requirement identified | Backlog item | Decision / acceptance |
|---|---|---|---|---|
| To be recorded after interaction | | | | |

## 6. Development methodology

The project is planned using Scrum with five two-week sprints, with exact dates aligned to the official KTU/FISAT academic calendar and agreed with the Scrum Master.

- Progress meetings are encouraged approximately once every three days and should be less than 15 minutes.
- Sprint reviews are held every two weeks, should not exceed 30 minutes and must include a working demo to the Product Owner / Project Guide.
- Two interim Project Assessment Board evaluations are planned around Weeks 6 and 11, separately from sprint reviews.
- The Scrum Book contains four parts: Product Backlog; Database & UI Design; Testing & Validation; Details of Versions.
- Git is used for version control. Tests are run throughout development, and defects are tracked.

See [Project Plan](PROJECT_PLAN.md) for the full 14-week schedule.

## 7. Technology and architecture

- Frontend: React 18, Vite, React Router and Axios.
- Backend: Node.js and Express REST API.
- Database: MongoDB with Mongoose.
- Authentication: JWT and bcryptjs.
- Version control and CI: Git, GitHub and GitHub Actions.
- Packaging / local environment: Docker Compose.
- Testing: Node.js automated tests, MongoDB-backed integration tests, frontend production build and manual acceptance testing.

The application uses a three-tier design: React presentation layer, Express application/API layer and MongoDB persistence layer.

## 8. Functional requirements

1. The system shall allow a student to register and log in.
2. The system shall allow an authenticated student to view and update an academic profile.
3. The system shall allow students to create, browse and search academic doubts.
4. The system shall allow students to submit answers to doubts.
5. The system shall allow learners to discover peer tutors by relevant subject/skill.
6. The system shall allow learners to request tutoring with date, time and mode.
7. Only the assigned tutor shall be allowed to accept or reject a pending request.
8. An accepted session shall be marked completed according to defined permissions.
9. The system shall provide user-specific notifications and read-state controls.
10. An eligible learner shall be able to submit one review for a completed session.

## 9. Non-functional requirements

- **Security:** Password hashing, token-based authentication, validation and authorization.
- **Usability:** Responsive interface and clear action/status feedback.
- **Maintainability:** Separation of frontend, backend, routes, middleware and data models.
- **Reliability:** Validated booking transitions and duplicate-review prevention.
- **Portability:** Reproducible local setup using documented dependencies or Docker Compose.
- **Accessibility:** Use semantic UI and keyboard-accessible interactions; make conformance claims only when supported by an accessibility audit.

## 10. Deliverables

1. Approved project synopsis and requirements.
2. Integrated software source code under Git.
3. Architecture, ER diagram, database and UI design.
4. Product backlog and five sprint increments.
5. Four-part Scrum Book with dated records.
6. Automated/manual test records and defect log.
7. Final project report and presentation.
8. Reproducible setup/deployment instructions and evidence.

## 11. Expected outcome

A working academic peer-learning prototype integrating student identity, question sharing, tutor discovery, scheduling and feedback. The project demonstrates requirements analysis, software design, modular implementation, iterative integration, testing, documentation and deployment preparation.

## 12. Limitations and future work

The current scope does not include real-time messaging, file sharing, admin moderation or institutional identity verification. Public production deployment requires additional hosting, security, monitoring and operational configuration.

## 13. Approval record

**Supervisor decision:** To be completed by the Project Supervisor  
**Comments / requested changes:** To be recorded  
**Approval date:** To be recorded  
**Student signature:** To be completed as required  
**Supervisor signature:** To be completed by the supervisor
