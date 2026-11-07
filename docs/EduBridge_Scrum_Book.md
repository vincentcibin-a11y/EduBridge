# EduBridge Scrum Book
## MCA Main Project — 20MCA246 — FISAT

**Project:** EduBridge – A Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform  
**Student:** Cibin Vincent  
**Programme:** MCA  
**Student ID:** FIT25MCA-2028  
**Project Guide:** Ms. Senu Abi  
**Repository:** https://github.com/vincentcibin-a11y/EduBridge

> **Record-keeping note:** This Scrum Book is aligned with the KTU MCA Main Project (20MCA246) syllabus. It documents sprint activities, backlog items, automated test outcomes, verified change history, and guide interactions for the completed submission.

## Contents
1. Product Backlog
2. Database and UI Design
3. Testing and Validation
4. Details of Versions
5. Sprint and Meeting Records
6. Review and Submission Checklist

---

# 1. Product Backlog

## 1.1 Product vision
EduBridge provides a college-focused peer-learning platform where students can post academic doubts, answer classmates, discover peers with relevant skills, request tutoring sessions, and review completed sessions.

## 1.2 Product goals
- Make academic doubt sharing and peer answers accessible (WCAG 2.1 AA compliant).
- Help learners find tutors by subject, skill, and profile.
- Support requests for online or offline tutoring.
- Track session status and notify users about important events.
- Encourage trustworthy peer learning through ratings and feedback.

## 1.3 Product backlog

| ID | Backlog item | Priority | Acceptance criteria | Status |
|---|---|---|---|---|
| PB-01 | Student registration and login | High | Valid users can register and log in; passwords hashed; protected APIs require authentication. | **Completed & Verified** |
| PB-02 | Student profile | High | Student can update profile, subjects, skills, and availability. | **Completed & Verified** |
| PB-03 | Create and search doubts | High | Authenticated students can post and search doubts; inputs validated. | **Completed & Verified** |
| PB-04 | Answer a doubt | High | Students can view a doubt and submit an answer. | **Completed & Verified** |
| PB-05 | Discover peer tutors | High | Search supports relevant names, subjects, and skills and displays rating summaries. | **Completed & Verified** |
| PB-06 | Request tutoring | High | Learner can request a valid future session in online/offline mode. | **Completed & Verified** |
| PB-07 | Tutor accepts/rejects request | High | Only the assigned tutor can act on a pending request. | **Completed & Verified** |
| PB-08 | Complete a session | High | An accepted session can be completed; repeat completion is prevented. | **Completed & Verified** |
| PB-09 | Notifications | Medium | Users can view notifications and mark one/all as read. | **Completed & Verified** |
| PB-10 | Rate a completed session | Medium | Learner can submit one 1–5 rating for a completed booking; tutor summary is updated. | **Completed & Verified** |
| PB-11 | Real-time chat | Medium | Learner and tutor can exchange messages in a session. | Planned (Future Scope) |
| PB-12 | Resource sharing | Medium | Students can share useful study resources. | Planned (Future Scope) |
| PB-13 | Admin moderation | Low | Admin can review reported content and users. | Planned (Future Scope) |
| PB-14 | Expanded automated tests & hardening | High | Critical API and UI flows have repeatable tests and security rate limits. | **Completed & Verified** |

## 1.4 Definition of Done
A backlog item is considered done when its acceptance criteria are met, automated integration tests pass, manual acceptance scenarios are verified with screenshot evidence, changes are committed, and the guide has reviewed the demonstration.

## 1.5 Product increments
- **Increment 1:** Authentication, profiles, and initial application structure.
- **Increment 2:** Doubt posting, searching, and peer answers.
- **Increment 3:** Tutor discovery and tutoring request workflow.
- **Increment 4:** Notifications, session completion, ratings, and documentation.
- **Increment 5:** Security hardening, WCAG 2.1 AA accessibility, rate limiting, and KTU deliverables.

---

# 2. Database and UI Design

## 2.1 Architecture
- **Frontend:** React 18, Vite 6, React Router 7, Axios, responsive CSS.
- **Backend:** Node.js 20 and Express.js 4 REST API.
- **Database:** MongoDB 7 with Mongoose models.
- **Authentication:** JWT (JSON Web Tokens) and bcryptjs.
- **Version control and CI:** Git, GitHub, GitHub Actions.
- **Local environment:** Docker Compose (3-tier stack: frontend, backend, MongoDB).

## 2.2 Main data entities

| Entity / collection | Purpose | Main fields / relationships |
|---|---|---|
| User | Student account and profile | Name, email, password hash, college, course, semester, subjects, skills, availability, reputation, ratingAverage, ratingCount |
| Doubt | Academic question | Author (ref User), title, description, subject, tags, status, answers (user ref, content, timestamp) |
| Booking | Tutoring request/session | Learner (ref User), tutor (ref User), subject, date/time, mode, location, notes, status, reviewedByLearner |
| Notification | In-app event stream | Recipient (ref User), type, title, message, link, read state |
| Review | Feedback for completed session | Booking (ref Booking, unique), learner (ref User), tutor (ref User), rating (1-5), feedback |

## 2.3 Relationships
- A user can create many doubts and answers.
- A user can act as learner in many bookings and tutor in many bookings.
- A completed booking has a 1-to-1 relationship with at most one learner review (`unique: true`).
- A user can receive many notifications.
- Reviews contribute to a tutor's rating average and rating count via Mongoose aggregation.

## 2.4 UI screen register

| Screen | Purpose | Key elements |
|---|---|---|
| Register / Login | Account access | Form validation, password constraints, accessible labels |
| Dashboard | Entry point | Statistics overview, quick links, 4-step workflow guide |
| Doubt Board | Academic doubts | Search bar, subject filters, ask doubt form, answer thread |
| Tutor Discovery | Peer search | Search by subject/skill, tutor card with rating and availability, booking modal |
| Sessions | Tutoring lifecycle | Pending requests, accept/reject, mark complete, verified review form |
| Notifications | Activity feed | Unread counter, mark as read, mark all read, event timestamps |
| Profile | Skills management | Course, semester, editable subjects and skills, reputation display |

---

# 3. Testing and Validation

## 3.1 Test strategy
- Unit and security tests for rate limiting, CORS, input sanitization, and token claims.
- End-to-end integration tests using MongoDB for the complete student workflow.
- Frontend production bundle build verification via Vite.
- Manual browser acceptance tests (AT-01 to AT-14) against running instances with screenshot evidence.

## 3.2 Test cases

| Test ID | Scenario | Expected result | Status | Evidence |
|---|---|---|---|---|
| TC-01 | Register with valid details | Account is created | **Pass** | Automated + [`02-registration-login.png`](evidence/02-registration-login.png) |
| TC-02 | Register with invalid email or missing fields | Validation error | **Pass** | Automated test in `app.test.js` |
| TC-03 | Login with valid credentials | User receives authenticated response | **Pass** | Automated + [`02-registration-login.png`](evidence/02-registration-login.png) |
| TC-04 | Login with incorrect password | Safe authentication error | **Pass** | Automated test in `app.test.js` |
| TC-05 | Access protected API without token | Request is rejected (401) | **Pass** | Automated test in `app.test.js` |
| TC-06 | Create a valid doubt | Doubt is saved and returned | **Pass** | Automated + [`04-doubt.png`](evidence/04-doubt.png) |
| TC-07 | Search doubts using special characters | Search is handled safely via regex escaping | **Pass** | Automated + Manual |
| TC-08 | Submit a valid answer | Answer is saved and author attributed | **Pass** | Automated + [`05-answer.png`](evidence/05-answer.png) |
| TC-09 | Request a future tutoring session | Pending booking is created | **Pass** | Automated + [`07-booking-pending.png`](evidence/07-booking-pending.png) |
| TC-10 | Attempt self-booking or past booking | Request is rejected (400) | **Pass** | Automated test in `app.test.js` |
| TC-11 | Accept/reject a non-pending booking | Invalid transition is rejected (409) | **Pass** | Automated test in `integration.test.js` |
| TC-12 | Complete an accepted booking | Booking becomes completed once (+5 reputation) | **Pass** | Automated + [`09-session-completed.png`](evidence/09-session-completed.png) |
| TC-13 | Submit review for completed booking | Review is saved and tutor summary updated | **Pass** | Automated + [`10-review-rating.png`](evidence/10-review-rating.png) |
| TC-14 | Submit duplicate review | Duplicate is rejected (409 Conflict) | **Pass** | Automated test in `integration.test.js` |
| TC-15 | Mark notification(s) as read | Read state is updated | **Pass** | Automated + [`11-notifications.png`](evidence/11-notifications.png) |
| TC-16 | Run frontend production build | Build completes successfully in ~6.6s | **Pass** | Production build verified |
| TC-17 | Update profile and search tutor by subject | Profile saved; matching tutor appears; self excluded | **Pass** | Automated + [`06-tutor-search.png`](evidence/06-tutor-search.png) |
| TC-18 | Mark one/all notifications read and attempt cross-user access | Read state updates; foreign notification forbidden | **Pass** | Automated test in `integration.test.js` |
| TC-19 | Reject a pending booking and attempt completion | Booking is rejected; completion rejected | **Pass** | Automated test in `integration.test.js` |

## 3.3 Defect log

| Defect ID | Date | Description | Severity | Fix / commit | Retest result |
|---|---|---|---|---|---|
| DEF-01 | 28/10/2026 | Non-object JSON body rejected with unhandled 500 | Low | `e426d7e` (Added JSON shape guard) | **Pass** |
| DEF-02 | 28/10/2026 | Malformed JWT claims allowed protected route access | Medium | `b691956` (Harden JWT payload claims) | **Pass** |

## 3.4 Validation evidence
Screenshots and evidence logs are recorded in [`docs/evidence/`](evidence/).

---

# 4. Details of Versions

## 4.1 Versioning approach
Git commits record incremental development milestones:

| Version / increment | Main scope | Evidence |
|---|---|---|
| v0.1 | Project scaffold, frontend/backend setup | `76cf73d` / `37265a8` |
| v0.2 | Authentication and student profiles | `668031c` / `1ce507e` |
| v0.3 | Doubts, tags, and peer answers | `90390c6` / `72b548c` |
| v0.4 | Tutor discovery and booking workflow | `41fb3ef` / `c3740be` |
| v0.5 | Notifications, reviews, rating aggregation | `cecb6a8` / `f8bc88d` |
| v1.0 | KTU Main Project hardened submission build | `4f0baba` / `main` |

## 4.2 Verified repository changes

| Date (UTC) | Commit | Change |
|---|---|---|
| 2026-09-26 | `9f2e47e` | Add backend API integration coverage |
| 2026-09-26 | `ff049fc` | Run backend integration tests with MongoDB in CI |
| 2026-09-26 | `76cf73d` | Add Docker Compose development environment |
| 2026-09-27 | `2914f08` | Add syllabus-aligned Scrum Book |
| 2026-09-27 | `534642c` | Add MCA mini project documentation |
| 2026-09-27 | `6dfabc3` | Expand integration coverage for profiles, tutor search, notifications, and rejection |
| 2026-09-27 | `98a3f8d` | Build Docker images as part of CI validation |
| 2026-10-27 | `201900a` | Complete academic deliverables, harden security, and enhance accessibility |
| 2026-10-28 | `b691956` | Harden JWT payload validation |
| 2026-10-28 | `e426d7e` | Reject invalid JSON payload shapes |
| 2026-10-28 | `4f0baba` | Fix duplicate and align JSON payload test |

---

# 5. Sprint and Meeting Records

## 5.1 Sprint cadence
Two-week sprint increments with regular reviews and demonstrations with the Project Guide, Ms. Senu Abi.

## 5.2 Sprint execution summary

| Sprint | Focus | Outcome & Review Evidence |
|---|---|---|
| Sprint 1 | Project setup, Express/React architecture, Auth & JWT | Registration/login demonstration verified |
| Sprint 2 | Doubt board, rich answers, tags, search filtering | Doubt asking and answering flow verified |
| Sprint 3 | Tutor directory, profile skills, scheduling & booking | Booking state machine demonstration verified |
| Sprint 4 | Notifications stream, session completion, verified reviews | End-to-end review and rating workflow verified |
| Sprint 5 | Security hardening, rate limiting, WCAG 2.1 AA accessibility, Docker CI | Hardened submission build and full documentation suite |

## 5.3 Guide feedback and correction log

| Date | Feedback | Action taken | Verified by |
|---|---|---|---|
| 10/09/2026 | Emphasize peer-learning accessibility and course relevance | Added WCAG 2.1 AA landmarks, ARIA labels, and college filters | Ms. Senu Abi |
| 18/09/2026 | Ensure tutoring sessions enforce valid state transitions | Implemented FSM (pending → accepted/rejected → completed) | Ms. Senu Abi |
| 29/09/2026 | Include comprehensive automated test evidence and review ratings | Added 24 automated tests + verified review aggregation | Ms. Senu Abi |

---

# 6. Review and Submission Checklist

- [x] Product backlog updated with actual status.
- [x] Database design and ERD match the implemented schemas.
- [x] UI screenshots are from the current running application.
- [x] Test results are based on executed tests (24/24 passed).
- [x] Defects and retest results are recorded.
- [x] Version table contains actual commit SHAs and dates.
- [x] Sprint review dates, attendance, demos, and guide feedback are recorded.
- [x] Repository and CI links are current.
- [x] Final document reviewed by the Project Guide.
