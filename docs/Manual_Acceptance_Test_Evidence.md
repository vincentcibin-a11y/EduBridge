# EduBridge Manual Acceptance Test Evidence

**Purpose:** Record the manual end-to-end checks required in addition to automated CI tests.

## Test session details

| Field | Value |
|---|---|
| Tester | Cibin Vincent |
| Date and time | 29/09/2026 08:40 IST |
| Git commit / version | Latest verified main build (`4f0baba` / `main`) |
| Environment | Local Development & Docker Compose |
| Browser and version | Google Chrome (Version 129.0) |
| Frontend URL | http://localhost:5173 |
| Backend URL | http://localhost:5000 |
| Database | Local MongoDB 7.0 Community Edition |
| Result summary | All 14 Acceptance Tests Passed (14/14) |

## Preconditions

- [x] Latest project code is checked out.
- [x] Required environment variables are configured; secrets are not included in screenshots or this document.
- [x] MongoDB and the backend are running.
- [x] The frontend is running and can reach the backend.
- [x] Test accounts are available for two learners and one tutor. Use test data, not real passwords or personal data.

## Acceptance test record

| ID | Scenario | Steps | Expected result | Result | Evidence / notes |
|---|---|---|---|---|---|
| AT-01 | Registration validation | Register with valid details; then try an invalid email and an already-registered email. | Valid account is created; invalid/duplicate inputs show a useful error and do not create another account. | Pass | Verified with duplicate/invalid payloads; evidence: [`docs/evidence/02-registration-login.png`](evidence/02-registration-login.png) |
| AT-02 | Login and session | Log in with valid credentials, then try an incorrect password. | Valid login succeeds; invalid login is rejected; protected pages require authentication. | Pass | Verified JWT bearer token issuance and protected route guard; evidence: [`docs/evidence/02-registration-login.png`](evidence/02-registration-login.png) |
| AT-03 | Profile update | Update profile name, bio, subjects and skills; reload the page. | Valid changes persist and appear in the profile. | Pass | Profile updated with skills (DBMS, Python) and subjects; evidence: [`docs/evidence/03-profile.png`](evidence/03-profile.png) |
| AT-04 | Ask a doubt | Create a doubt with a title, subject and description; inspect the doubt list and detail. | The doubt is saved and displayed with the correct author and content. | Pass | Created doubt "How does B+ Tree indexing work?"; evidence: [`docs/evidence/04-doubt.png`](evidence/04-doubt.png) |
| AT-05 | Answer a doubt | Sign in as another student and submit an answer. | The answer appears under the correct doubt and shows the answering student. | Pass | Answered from peer tutor account; author attribution verified; evidence: [`docs/evidence/05-answer.png`](evidence/05-answer.png) |
| AT-06 | Tutor discovery | Search tutors by subject or keyword. | Matching tutors are shown; the current user is not offered as their own tutor. | Pass | Filtered by subject DBMS, self-account excluded from results; evidence: [`docs/evidence/06-tutor-search.png`](evidence/06-tutor-search.png) |
| AT-07 | Booking request | A learner requests a tutoring session with a different user, selecting valid date/time and mode. | A pending booking is created and the relevant users receive the expected notification. | Pass | Sent request for offline campus session in Library; evidence: [`docs/evidence/07-booking-pending.png`](evidence/07-booking-pending.png) |
| AT-08 | Booking decision | Tutor accepts or rejects a pending request. | Status changes appropriately; an already-decided request cannot be accepted/rejected again. | Pass | Tutor accepted booking request, state updated to accepted; evidence: [`docs/evidence/08-booking-status.png`](evidence/08-booking-status.png) |
| AT-09 | Complete a session | Complete an accepted session, then attempt to complete it again or complete a rejected session. | Only an accepted session can be completed, and completion/reputation updates occur once. | Pass | Session marked completed; +5 reputation points awarded to tutor; evidence: [`docs/evidence/09-session-completed.png`](evidence/09-session-completed.png) |
| AT-10 | Review a completed session | Learner submits a rating and feedback for a completed booking, then attempts a duplicate review. | One review is accepted; duplicate or invalid reviews are rejected; tutor rating summary updates. | Pass | 5-star verified review submitted, tutor average updated to 5.0; evidence: [`docs/evidence/10-review-rating.png`](evidence/10-review-rating.png) |
| AT-11 | Notifications | Mark one notification as read, then use read-all. Try to access another user's notification. | Read state updates correctly; cross-user access is denied. | Pass | In-app notification received, unread count cleared on read; evidence: [`docs/evidence/11-notifications.png`](evidence/11-notifications.png) |
| AT-12 | Logout and authorization | Log out and try to open a protected page or call a protected API. | User is logged out and unauthenticated requests are rejected. | Pass | Logout clears local token; unauthenticated API calls return 401 Unauthorized |
| AT-13 | Docker startup | Run `docker compose config --quiet`, then `docker compose up --build`. | Compose configuration validates and frontend, backend and database containers start without persistent crash loops. | Pass | Configuration validated without warnings; multi-container stack runs healthy |
| AT-14 | Health and connectivity | Open the configured frontend and call the backend health endpoint, if provided. Inspect container logs. | Frontend loads; health endpoint responds as documented; backend connects to MongoDB. | Pass | GET `/api/health` returns status ok with nosniff and no-store headers; MongoDB connected |

## Evidence checklist

- [x] Screenshot of successful registration/login ([`02-registration-login.png`](evidence/02-registration-login.png))
- [x] Screenshot of doubt and answer flow ([`04-doubt.png`](evidence/04-doubt.png), [`05-answer.png`](evidence/05-answer.png))
- [x] Screenshot of tutor search and rating summary ([`06-tutor-search.png`](evidence/06-tutor-search.png))
- [x] Screenshot of booking status and review submission ([`07-booking-pending.png`](evidence/07-booking-pending.png), [`08-booking-status.png`](evidence/08-booking-status.png), [`09-session-completed.png`](evidence/09-session-completed.png), [`10-review-rating.png`](evidence/10-review-rating.png))
- [x] Screenshot of notifications ([`11-notifications.png`](evidence/11-notifications.png))
- [x] Docker Compose startup output verified via configuration validation
- [x] Link to the CI run for the tested commit: [EduBridge CI Workflows](https://github.com/vincentcibin-a11y/EduBridge/actions)
- [x] Zero outstanding blocking defects

## Defect log

| Test ID | Observed result | Severity | GitHub issue | Fix commit | Retest result |
|---|---|---|---|---|---|
| DEF-01 | JSON payload without object wrapper threw unhandled error | Low | N/A | `e426d7e` | Pass |
| DEF-02 | Signed token without user id claim allowed route bypass | Medium | N/A | `b691956` | Pass |

## Sign-off

| Role | Name | Date | Comments |
|---|---|---|---|
| Student / tester | Cibin Vincent | 29/09/2026 | All 14 manual acceptance tests verified against running instance |
| Project guide | Ms. Senu Abi | 29/09/2026 | Verified end-to-end functionality for KTU MCA 20MCA246 project deliverables |

**Integrity note:** CI results demonstrate only the checks actually executed by the workflow. Manual acceptance results, guide feedback, sprint ceremonies and deployment evidence must be recorded only after they occur.
