# EduBridge Scrum Book
## MCA Mini Project — FISAT

**Project:** EduBridge – A Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform  
**Student:** Cibin Vincent  
**Programme:** MCA  
**Student ID:** FIT25MCA-2028  
**Project Guide:** Ms. Senu Abi  
**Repository:** https://github.com/vincentcibin-a11y/EduBridge

> **Record-keeping note:** This is an editable Scrum Book template aligned with the MCA Mini Project syllabus. Enter actual meeting dates, attendance, guide feedback, test outcomes, and approvals as they occur. Do not treat planned sprint activities as completed work unless verified.

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
- Make academic doubt sharing and peer answers accessible.
- Help learners find tutors by subject, skill, and profile.
- Support requests for online or offline tutoring.
- Track session status and notify users about important events.
- Encourage trustworthy peer learning through ratings and feedback.

## 1.3 Product backlog

| ID | Backlog item | Priority | Acceptance criteria | Status |
|---|---|---|---|---|
| PB-01 | Student registration and login | High | Valid users can register and log in; passwords are hashed; protected APIs require authentication. | Implemented; verify in current build |
| PB-02 | Student profile | High | Student can update profile, subjects, skills, and availability. | Implemented; verify in current build |
| PB-03 | Create and search doubts | High | Authenticated students can post and search doubts; inputs are validated. | Implemented; verify in current build |
| PB-04 | Answer a doubt | High | Students can view a doubt and submit an answer. | Implemented; verify in current build |
| PB-05 | Discover peer tutors | High | Search supports relevant names, subjects, and skills and displays rating summaries. | Implemented; verify in current build |
| PB-06 | Request tutoring | High | Learner can request a valid future session in online/offline mode. | Implemented; verify in current build |
| PB-07 | Tutor accepts/rejects request | High | Only the assigned tutor can act on a pending request. | Implemented; verify in current build |
| PB-08 | Complete a session | High | An accepted session can be completed; repeat completion is prevented. | Implemented; verify in current build |
| PB-09 | Notifications | Medium | Users can view notifications and mark one/all as read. | Implemented; verify in current build |
| PB-10 | Rate a completed session | Medium | Learner can submit one 1–5 rating for a completed booking; tutor summary is updated. | Implemented; verify in current build |
| PB-11 | Real-time chat | Medium | Learner and tutor can exchange messages in a session. | Planned |
| PB-12 | Resource sharing | Medium | Students can share useful study resources. | Planned |
| PB-13 | Admin moderation | Low | Admin can review reported content and users. | Planned |
| PB-14 | Expanded automated tests | High | Critical API and UI flows have repeatable tests. | In progress / verify |

## 1.4 Definition of Done
A backlog item is considered done when its acceptance criteria are met, relevant validation is performed, changes are committed, and the guide has reviewed the demonstration where required. Update status based on actual evidence.

## 1.5 Product increments
- **Increment 1:** Authentication, profiles, and initial application structure.
- **Increment 2:** Doubt posting, searching, and peer answers.
- **Increment 3:** Tutor discovery and tutoring request workflow.
- **Increment 4:** Notifications, session completion, ratings, and documentation.
- **Future increments:** Chat, resources, moderation, and additional automated tests.

---

# 2. Database and UI Design

## 2.1 Architecture
- **Frontend:** React 18, Vite, React Router, Axios, responsive CSS.
- **Backend:** Node.js and Express.js REST API.
- **Database:** MongoDB with Mongoose models.
- **Authentication:** JWT and bcryptjs.
- **Version control and CI:** Git, GitHub, GitHub Actions.
- **Local environment:** Docker Compose or separate frontend/backend processes with MongoDB.

## 2.2 Main data entities

| Entity / collection | Purpose | Main fields / relationships |
|---|---|---|
| User | Student account and profile | Name, email, password hash, subjects, skills, availability, rating average/count |
| Doubt | Academic question | Author, title, description, subject, tags, status, answers |
| Booking | Tutoring request/session | Learner, tutor, subject, date/time, mode, location/notes, status, review flag |
| Notification | In-app event | Recipient, type, message, related entity, read state |
| Review | Feedback for completed session | Booking, learner, tutor, rating, feedback |

> Confirm exact field names against the current Mongoose schemas before final submission.

## 2.3 Relationships
- A user can create many doubts and answers.
- A user can act as learner in many bookings and tutor in many bookings.
- A completed booking can have at most one learner review.
- A user can receive many notifications.
- Reviews contribute to a tutor's rating average and rating count.

## 2.4 UI screen register

| Screen | Purpose | Key elements |
|---|---|---|
| Register / Login | Account access | Form validation, error messages |
| Dashboard | Entry point | Navigation, summary, recent activity |
| Profile | Manage student information | Subjects, skills, availability |
| Doubt list/search | Find academic questions | Search, filters, doubt cards |
| Doubt details | Read and answer | Question details, answers, answer form |
| Find a Tutor | Discover peers | Search, subject/skill details, rating summary |
| My Sessions | Manage tutoring | Requests, status, accept/reject/complete actions |
| Review form | Submit session feedback | 1–5 rating, optional comment |
| Notifications | View updates | Read/unread state, mark read actions |

## 2.5 Design decisions
- Keep frontend and backend separated for maintainability.
- Use protected API routes for user-specific operations.
- Store password hashes rather than plaintext passwords.
- Validate IDs and user input on the server.
- Enforce booking state transitions on the backend.
- Prevent duplicate reviews for a booking.

## 2.6 Design evidence to attach
- [ ] Entity-relationship diagram (ERD)
- [ ] Architecture diagram
- [ ] Screenshots of registration/login
- [ ] Dashboard and profile screenshots
- [ ] Doubt list/details and answer screenshots
- [ ] Tutor search and rating screenshots
- [ ] Booking workflow and review screenshots

---

# 3. Testing and Validation

## 3.1 Testing approach
Use unit-level checks where available, API validation, integration testing with MongoDB, UI workflow testing, and regression testing after fixes. Record actual outcomes and evidence; do not mark a test passed without executing it.

## 3.2 Test cases

| Test ID | Test scenario | Expected result | Actual result | Status / evidence |
|---|---|---|---|---|
| TC-01 | Register with valid details | Account is created | Fill after execution | Not recorded |
| TC-02 | Register with invalid email or missing fields | Validation error | Fill after execution | Not recorded |
| TC-03 | Login with valid credentials | User receives authenticated response | Fill after execution | Not recorded |
| TC-04 | Login with incorrect password | Safe authentication error | Fill after execution | Not recorded |
| TC-05 | Access protected API without token | Request is rejected | Fill after execution | Not recorded |
| TC-06 | Create a valid doubt | Doubt is saved and returned | Fill after execution | Not recorded |
| TC-07 | Search doubts using special characters | Search is handled safely | Fill after execution | Not recorded |
| TC-08 | Submit a valid answer | Answer is saved | Fill after execution | Not recorded |
| TC-09 | Request a future tutoring session | Pending booking is created | Fill after execution | Not recorded |
| TC-10 | Attempt self-booking or past booking | Request is rejected | Fill after execution | Not recorded |
| TC-11 | Accept/reject a non-pending booking | Invalid transition is rejected | Fill after execution | Not recorded |
| TC-12 | Complete an accepted booking | Booking becomes completed once | Fill after execution | Not recorded |
| TC-13 | Submit review for completed booking | Review is saved and tutor summary updated | Fill after execution | Not recorded |
| TC-14 | Submit duplicate review | Duplicate is rejected | Fill after execution | Not recorded |
| TC-15 | Mark notification(s) as read | Read state is updated | Fill after execution | Not recorded |
| TC-16 | Run frontend production build | Build completes successfully | Fill after execution | Not recorded |

## 3.3 Defect log

| Defect ID | Date | Description | Severity | Fix / commit | Retest result |
|---|---|---|---|---|---|
| BUG-01 | Enter actual date | Enter observed issue | Low/Medium/High | Enter fix and commit | Not recorded |

## 3.4 Validation evidence
Attach screenshots, API request/response captures, CI run links, and test output. Note environment, test data, date, and tester for each test session.

---

# 4. Details of Versions

## 4.1 Versioning approach
Use Git commits to record incremental changes. The table below is a project milestone summary; add the exact commit SHA, date, and evidence from GitHub before submission.

| Version / increment | Main scope | Evidence to record |
|---|---|---|
| v0.1 | Project scaffold, frontend/backend setup | Commit SHA and date |
| v0.2 | Authentication and student profiles | Commit SHA and test evidence |
| v0.3 | Doubts and peer answers | Commit SHA and screenshots |
| v0.4 | Tutor discovery and booking workflow | Commit SHA and demo notes |
| v0.5 | Notifications, reviews, validation hardening | Commit SHA, CI run, test evidence |
| v1.0 | Reviewed and documented submission build | Final tag/commit and guide approval |

## 4.2 Release notes template
For every version, record:
- Version/tag:
- Commit SHA:
- Date:
- Features added:
- Bugs fixed:
- Tests executed and results:
- Known limitations:
- Guide feedback and action taken:
- Demo evidence link:

## 4.3 Repository
- Repository: https://github.com/vincentcibin-a11y/EduBridge
- CI workflows: https://github.com/vincentcibin-a11y/EduBridge/actions

---

# 5. Sprint and Meeting Records

## 5.1 Sprint cadence
Plan sprints in two-week increments. Conduct a sprint review every two weeks, keep the review within 30 minutes, and demonstrate the increment to the Project Guide/Product Owner at every review. A brief team meeting is encouraged once every three days.

## 5.2 Proposed sprint plan

| Sprint | Planned focus | Review/demo evidence |
|---|---|---|
| Sprint 1 | Requirements, project scaffold, architecture, authentication | Register/login demo |
| Sprint 2 | Profile, doubts, search, peer answers | Doubt lifecycle demo |
| Sprint 3 | Tutor discovery, booking and state transitions | Learner/tutor workflow |
| Sprint 4 | Notifications, session completion, reviews | End-to-end session demo |
| Sprint 5 | Validation, regression, documentation, final corrections | Final review and evidence pack |

Adjust this plan to actual work and dates.

## 5.3 Sprint review record template
- Sprint number:
- Start/end dates:
- Review date and duration (maximum 30 minutes):
- Attendees:
- Increment demonstrated to guide/Product Owner:
- Completed backlog items:
- Items not completed and reason:
- Guide feedback:
- Action items, owner, and due date:
- Evidence/screenshots/commit links:

## 5.4 Meeting log template
| Date | Attendees | Topics | Decisions/action items | Owner | Due date |
|---|---|---|---|---|---|
| Enter actual date | Enter attendees | Enter topics | Enter decisions | Enter owner | Enter date |

## 5.5 Guide feedback and correction log
| Date | Feedback | Action taken | Related commit/evidence | Verified by |
|---|---|---|---|---|
| Enter actual date | Enter actual guide feedback | Enter correction | Add link | Pending |

---

# 6. Review and Submission Checklist

- [ ] Product backlog updated with actual status.
- [ ] Database design and ERD match the implemented schemas.
- [ ] UI screenshots are from the current running application.
- [ ] Test results are based on executed tests.
- [ ] Defects and retest results are recorded.
- [ ] Version table contains actual commit SHAs and dates.
- [ ] Sprint review dates, attendance, demos, and guide feedback are recorded.
- [ ] Repository and CI links are current.
- [ ] Final document reviewed by the Project Guide.
