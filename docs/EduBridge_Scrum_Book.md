# EduBridge Scrum Book
## MCA Main Project — FISAT

**Project:** EduBridge — Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform  
**Student:** Cibin Vincent  
**Programme:** MCA  
**Student ID:** FIT25MCA-2028  
**Internal Guide:** Ms. Senu Abi (confirm formal assignment)  
**Repository:** https://github.com/vincentcibin-a11y/EduBridge

> This Scrum Book follows the four prescribed parts: (1) Product Backlog, (2) Database & UI Design, (3) Testing & Validation and (4) Details of Versions. Make dated entries at regular intervals. Planned activities must remain separate from completed records. Never invent meeting attendance, feedback, approvals, test outcomes or evaluations.

## Contents
1. Product Backlog
2. Database & UI Design
3. Testing & Validation
4. Details of Versions
5. Progress meetings
6. Sprint reviews
7. Project Assessment Board evaluations
8. Product Owner / Scrum Master feedback

# Part 1 — Product Backlog

## 1.1 Product vision

Provide a college-focused peer-learning platform where students can publish academic doubts, answer classmates, discover peers with relevant subject skills, request tutoring sessions and review completed sessions.

## 1.2 Backlog and acceptance criteria

| ID | User story | Priority | Acceptance criteria | Implementation / status evidence |
|---|---|---|---|---|
| PB-01 | As a student, I can register and log in securely | Must | Valid registration/login; password hashing; protected API rejects invalid JWT | Auth routes and automated test files exist; add actual run record |
| PB-02 | As a student, I can manage my academic profile | Must | Profile, subjects and skills persist; protected fields cannot be overwritten | Profile API exists; record manual test |
| PB-03 | As a learner, I can post and search academic doubts | Must | Authenticated creation; required fields validated; search returns relevant results | Doubt route exists; record create/search tests |
| PB-04 | As a peer, I can answer an academic doubt | Must | Answer stored with author attribution and timestamp | Answer workflow exists; record test |
| PB-05 | As a learner, I can discover a peer tutor | Must | Search by subject/skill/name; own account excluded | Tutor route exists; record filter tests |
| PB-06 | As a learner, I can request tutoring | Must | Valid tutor/date/mode; no self-booking; state begins Pending | Booking route exists; record tests |
| PB-07 | As a tutor, I can accept/reject a pending request | Must | Only assigned tutor can decide; invalid transitions rejected | Booking state/authorization logic exists; record negative tests |
| PB-08 | As a participant, I can complete an accepted session | Must | Accepted → Completed once; repeated completion prevented | Completion route exists; record test |
| PB-09 | As a user, I can view and mark notifications read | Should | Only own notices accessible; individual and read-all work | Notification route exists; record test |
| PB-10 | As a learner, I can review a completed session | Must | Eligible learner only; rating 1–5; duplicate prevented | Review route/model exists; record test |
| PB-11 | As participants, we can chat in real time | Could | Participant-only message exchange | Future scope; not in current MVP |
| PB-12 | As a student, I can share learning resources | Could | Safe upload and access controls | Future scope |
| PB-13 | As an administrator, I can moderate reports | Could | Role-protected review/audit workflow | Future scope unless implemented |
| PB-14 | As a maintainer, I can validate the build | Must | Backend tests, frontend build and CI outcomes are repeatable and documented | Test/CI files exist; record actual latest result |
| PB-15 | As an evaluator, I can run the application reliably | Should | Documented startup and health check; production deployment only when configured | Docker/local setup exists; production deployment not claimed |

## 1.3 Product increments

| Increment | Sprint | Planned scope | Demo acceptance |
|---|---|---|---|
| 1 | Sprint 1 | Scaffold, registration/login and profile | Register, authenticate, view/update profile |
| 2 | Sprint 2 | Doubt board, search, answers and resolution | One student posts; another answers; author resolves |
| 3 | Sprint 3 | Tutor discovery and booking request lifecycle | Search by subject/skill; create and decide request |
| 4 | Sprint 4 | Completion, notifications and reviews | Complete accepted session and submit eligible review |
| 5 | Sprint 5 | Security/accessibility refinement, regression, docs and deployment readiness | Integrated release candidate and test evidence |

## 1.4 Backlog refinement register

| Date | Stakeholder / attendee role | Need or feedback | Decision / changed IDs | Owner / target |
|---|---|---|---|---|
| To be entered after actual discussion | | | | |

# Part 2 — Database & UI Design

## 2.1 Technology and architecture

- Frontend: React 18, Vite, React Router and Axios.
- Backend: Node.js, Express REST API and middleware.
- Database: MongoDB with Mongoose.
- Authentication: JWT and bcryptjs password hashing.
- Version control: Git and GitHub.
- CI: GitHub Actions.
- Local packaging: Docker Compose.

The system follows a three-tier architecture: React presentation layer → Express application/API layer → MongoDB persistence layer.

## 2.2 Database design register

| Entity | Purpose | Relationships |
|---|---|---|
| User | Student account, academic profile, skills and rating summary | Referenced by doubts, bookings, notifications and reviews |
| Doubt | Academic question, tags, status and embedded answers | Author references User; embedded answer authors reference User |
| Booking | Tutoring session request and lifecycle | Learner and tutor reference User |
| Notification | User-specific event and read state | Recipient references User |
| Review | Feedback for completed booking | Booking-linked review; learner/tutor reference User |

### Dated database design entries

| Date | Design decision / change | Reason | Product Owner / reviewer comment |
|---|---|---|---|
| To be entered when design is reviewed or changed | | | |

## 2.3 UI screen register

| Screen | Purpose | Main controls / information |
|---|---|---|
| Registration / Login | Authentication | Registration fields, login and validation |
| Dashboard | Main entry point | Navigation, profile summary and workflow shortcuts |
| Profile | Academic profile | Course, semester, subjects, skills and availability |
| Doubt Board | Academic question sharing | Create/search doubts, subject/tags and status |
| Doubt Details | Peer discussion | Doubt content and answer thread |
| Tutor Discovery | Find peer support | Name/subject/skill search, tutor details and booking action |
| Sessions | Manage tutoring workflow | Pending/accepted/rejected/completed states and actions |
| Notifications | Activity updates | Unread count and read/read-all controls |

### Dated UI design entries

| Date | Screen / design change | User need / reason | Reviewer comment / action |
|---|---|---|---|
| To be entered when UI is reviewed or changed | | | |

# Part 3 — Testing & Validation

## 3.1 Test approach

- Unit/module and middleware tests for validation, authentication, authorization and business rules.
- API tests for endpoints, status codes, payloads and ownership restrictions.
- MongoDB-backed integration tests for connected workflows.
- Regression tests after defects and sprint integration.
- Frontend production build checks.
- Manual browser acceptance tests with dated screenshots.
- CI runs on GitHub Actions.

Use Test Driven Development where appropriate. A test is marked Pass only after it has actually run. Keep automated, manual and CI evidence separate.

## 3.2 Test catalogue

| ID | Scenario | Expected result | Actual result / status / evidence |
|---|---|---|---|
| AUTH-01 | Register valid user | Account created safely | To be recorded after execution |
| AUTH-02 | Invalid registration / wrong password | Safe validation/authentication error | To be recorded after execution |
| AUTH-03 | Protected API without valid JWT | Request denied | To be recorded after execution |
| PROF-01 | Update and reload profile | Changes persist | To be recorded after execution |
| DOUBT-01 | Create/search/view doubt | Valid doubt is available | To be recorded after execution |
| DOUBT-02 | Submit answer | Answer appears with author | To be recorded after execution |
| TUTOR-01 | Search by subject/skill | Matching peers; self excluded | To be recorded after execution |
| BOOK-01 | Request future tutoring session | Booking becomes Pending | To be recorded after execution |
| BOOK-02 | Assigned tutor accepts/rejects | Valid transition only | To be recorded after execution |
| BOOK-03 | Unauthorized/invalid/repeated transition | Request rejected safely | To be recorded after execution |
| BOOK-04 | Complete accepted session | Completed once | To be recorded after execution |
| NOTIF-01 | Mark one/all notifications read | Own notification state updates | To be recorded after execution |
| REV-01 | Review eligible completed booking | One valid review accepted | To be recorded after execution |
| REV-02 | Duplicate/ineligible review | Request rejected | To be recorded after execution |
| BUILD-01 | Run frontend production build | Vite build completes | To be recorded after execution |
| CI-01 | Run GitHub Actions workflow | Configured jobs complete | Add actual run URL and result |

## 3.3 Test execution log

| Date/time | Commit SHA | Test IDs / command | Environment | Pass / Fail / Blocked | Evidence / log |
|---|---|---|---|---|---|
| Enter immediately after a real run | | | | | |

## 3.4 Defect register

| Defect ID | Date | Description | Severity | Reproduction / issue | Fix commit | Retest result |
|---|---|---|---|---|---|---|
| Enter when a defect is found | | | | | | |

## 3.5 Evidence guidance

Existing files under `docs/evidence/` can be referenced after confirming their capture date and tested build. A screenshot supports only the visible state; it does not prove every negative case. Retain command output, environment, commit SHA and actual test result.

# Part 4 — Details of Versions

## 4.1 Version register

| Date | Version / tag | Commit SHA | Change / modules | Tests and evidence |
|---|---|---|---|---|
| Populate from actual Git history | | | | |

## 4.2 Git practice

Use Git throughout development. Make focused commits with meaningful messages and use feature branches/pull requests where practical. Keep secrets out of source control. Do not fabricate or backdate commits to fit a sprint timeline.

```bash
git checkout -b feature/doubt-search
git add .
git commit -m "feat: add academic doubt search"
git push -u origin feature/doubt-search
```

# Progress meeting register — approximately every three days

The course encourages short progress meetings approximately once every three days. Each should be less than 15 minutes. Record actual date, attendees, completed work, next tasks, blockers and Scrum Master guidance after each meeting.

| No. | Date/time | Attendees | Completed work | Next tasks | Blocker | Scrum Master comment / action |
|---:|---|---|---|---|---|---|
| 1 | To be recorded | | | | | |
| 2 | To be recorded | | | | | |
| 3 | To be recorded | | | | | |

# Two-week sprint review register

Each sprint lasts two weeks. Every review should be no longer than 30 minutes and must include a working demo to the Product Owner / Project Guide.

| Sprint | Dates | Review date | Demo / commit | Attendees | Product Owner feedback | Action / owner | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | To confirm | To record | | | | | |
| 2 | To confirm | To record | | | | | |
| 3 | To confirm | To record | | | | | |
| 4 | To confirm | To record | | | | | |
| 5 | To confirm | To record | | | | | |

# Project Assessment Board register

The HOD constitutes the five-member Board: HOD (Chair), project supervisor(s), one Department faculty member, one sister-Department faculty member and an external expert. For an eligible external project, the External Guide may be invited as external expert.

| Evaluation | Course week | Actual date | Presentation / demo | Board comments | Corrective action / owner | Evidence |
|---|---:|---|---|---|---|---|
| First interim | 6 | To be recorded | | | | |
| Second interim | 11 | To be recorded | | | | |
| Final internal | 13 | To be recorded | | | | |
| External | 14 | To be recorded | | | | |

# Product Owner / Scrum Master feedback register

Record actual corrections and comments with their dates. If no feedback has yet been received, leave the row blank rather than inventing it.

| Date | Reviewer role | Feedback / correction | Change made | Commit / evidence | Follow-up |
|---|---|---|---|---|---|
| To be recorded after feedback | | | | | |

## Final checks

- [ ] Synopsis submitted and approval recorded.
- [ ] Product Owner and Scrum Master roles confirmed.
- [ ] Stakeholder interactions recorded.
- [ ] Five two-week sprints and reviews documented.
- [ ] Progress meetings recorded at prescribed cadence where held.
- [ ] First and second interim Board evaluations recorded.
- [ ] Final internal and external evaluation recorded after occurrence.
- [ ] Four parts maintained with dated entries.
- [ ] Tests, defects, retests and evidence are genuine and traceable.
- [ ] Git commits and releases match actual repository history.
- [ ] Report and presentation match final code.
- [ ] Deployment status accurately described; no unsupported production claim.