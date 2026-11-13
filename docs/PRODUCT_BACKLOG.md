# Product Backlog — EduBridge

This is the working backlog for the EduBridge MCA project. Priorities and acceptance criteria should be confirmed with the Product Owner. Implementation visible in the repository does not by itself prove manual test completion or supervisor sign-off. Update statuses only with evidence.

## Product vision

Provide a college-focused peer-learning platform where students can ask academic doubts, help peers, discover student tutors, schedule structured sessions and provide feedback.

## Stakeholders

- Student / learner
- Peer tutor
- Product Owner (customer where one exists; otherwise Internal Guide)
- Internal Guide and appointed Scrum Master
- Project Assessment Board and External Examiner

## Backlog items

| ID | Epic | User story | Priority | Acceptance criteria | Implementation / verification |
|---|---|---|---|---|---|
| PB-01 | Account | As a student, I can register and sign in securely | Must | Valid fields accepted; invalid input rejected; password hashed; protected routes require valid JWT | Auth routes and automated test files exist; record actual test run |
| PB-02 | Profile | As a student, I can maintain my academic profile, subjects and skills | Must | Valid edits persist and protected fields cannot be overwritten | Profile API exists; perform and record browser test |
| PB-03 | Doubts | As a learner, I can publish and search academic questions | Must | Required content validated; question appears in list/search | Doubt routes exist; record search and create tests |
| PB-04 | Answers | As a peer, I can answer a doubt | Must | Answer saved with author and timestamp; invalid answer rejected | Answer workflow exists; record author-attribution test |
| PB-05 | Tutor discovery | As a learner, I can find peers by subject and skill | Must | Matching profiles shown; own account excluded; query handled safely | Tutor route exists; test representative filters |
| PB-06 | Booking | As a learner, I can request a tutoring session | Must | No self-booking; date/time and mode validated; request begins Pending | Booking route/state rules exist; record tests |
| PB-07 | Booking lifecycle | As a tutor, I can accept or reject a request | Must | Only assigned tutor can decide a Pending request; invalid transitions rejected | Booking authorization/state rules; retain negative tests |
| PB-08 | Completion | As a participant, I can complete an accepted session | Must | Only Accepted transitions to Completed; repeated completion prevented | Completion route and test evidence |
| PB-09 | Notifications | As a user, I can view and mark my notices as read | Should | Only recipient can access/change own notices; read-all works | Notification route and tests |
| PB-10 | Reviews | As a learner, I can review a completed tutoring session | Must | Only eligible learner; rating 1–5; one review per booking; tutor aggregate updated | Review route/model and tests |
| PB-11 | Real-time chat | As session participants, I can exchange messages | Could | Authenticated participants can send/receive messages in their session | Future scope; not in current MVP |
| PB-12 | Learning resources | As a student, I can share useful study resources | Could | Upload type/size/ownership controls defined and tested | Future scope |
| PB-13 | Moderation | As an administrator, I can review reported content | Could | Role-based access, report workflow and audit trail | Future scope unless separately implemented |
| PB-14 | Quality and security | As a maintainer, I can run repeatable validation | Must | Backend checks/tests, frontend build and CI results documented | CI and test files exist; latest outcomes must be recorded |
| PB-15 | Deployment | As an evaluator, I can access a repeatable application | Should | Approved environment, protected secrets, HTTPS where public, health and smoke tests | Docker/local setup exists; production deployment not claimed |

## Product backlog refinement log

Record only actual requirements discussions and Product Owner decisions.

| Date | Stakeholder / attendee role | Requirement or feedback | Decision / changed backlog IDs | Owner / target |
|---|---|---|---|---|
| To be recorded after discussion | | | | |

## Priority guide

- **Must:** Core functionality needed for the primary learner-to-tutor workflow.
- **Should:** Important supporting functionality.
- **Could:** Optional enhancement that must not displace core scope.

## Definition of Done

A backlog item can move to Done only when acceptance criteria are met, code is integrated and committed, relevant tests have actually run, failures are resolved or documented, behaviour is demonstrated, and documentation/evidence is updated. Record guide feedback only when received.
