# EduBridge Manual Acceptance Test Evidence

**Purpose:** Record the manual end-to-end checks required in addition to automated CI tests.

> **Important:** This is a blank evidence record. Do not mark a test as passed until it has been executed against a running EduBridge instance. Attach screenshots or logs where indicated.

## Test session details

| Field | Value |
|---|---|
| Tester | Cibin Vincent|
| Date and time | 29/09/2026 8:40|
| Git commit / version | |
| Environment | Local / Docker / Staging |
| Browser and version | |
| Frontend URL | |
| Backend URL | |
| Database | Local MongoDB / Docker MongoDB / Staging |
| Result summary | Not executed |

## Preconditions

- [ ] Latest project code is checked out.
- [ ] Required environment variables are configured; secrets are not included in screenshots or this document.
- [ ] MongoDB and the backend are running.
- [ ] The frontend is running and can reach the backend.
- [ ] Test accounts are available for two learners and one tutor. Use test data, not real passwords or personal data.

## Acceptance test record

Use **Not run**, **Pass**, or **Fail** in the Result column. For failures, record the observed behaviour and create a GitHub issue.

| ID | Scenario | Steps | Expected result | Result | Evidence / notes |
|---|---|---|---|---|---|
| AT-01 | Registration validation | Register with valid details; then try an invalid email and an already-registered email. | Valid account is created; invalid/duplicate inputs show a useful error and do not create another account. | Not run | Pass |
| AT-02 | Login and session | Log in with valid credentials, then try an incorrect password. | Valid login succeeds; invalid login is rejected; protected pages require authentication. | Not run |Pass |
| AT-03 | Profile update | Update profile name, bio, subjects and skills; reload the page. | Valid changes persist and appear in the profile. | Not run |Pass |
| AT-04 | Ask a doubt | Create a doubt with a title, subject and description; inspect the doubt list and detail. | The doubt is saved and displayed with the correct author and content. | Not run | Pass|
| AT-05 | Answer a doubt | Sign in as another student and submit an answer. | The answer appears under the correct doubt and shows the answering student. | Not run | Pass|
| AT-06 | Tutor discovery | Search tutors by subject or keyword. | Matching tutors are shown; the current user is not offered as their own tutor. | Not run |Pass |
| AT-07 | Booking request | A learner requests a tutoring session with a different user, selecting valid date/time and mode. | A pending booking is created and the relevant users receive the expected notification. | Not run | Pass|
| AT-08 | Booking decision | Tutor accepts or rejects a pending request. | Status changes appropriately; an already-decided request cannot be accepted/rejected again. | Not run | Pass|
| AT-09 | Complete a session | Complete an accepted session, then attempt to complete it again or complete a rejected session. | Only an accepted session can be completed, and completion/reputation updates occur once. | Not run |Pass |
| AT-10 | Review a completed session | Learner submits a rating and feedback for a completed booking, then attempts a duplicate review. | One review is accepted; duplicate or invalid reviews are rejected; tutor rating summary updates. | Not run | Pass|
| AT-11 | Notifications | Mark one notification as read, then use read-all. Try to access another user's notification. | Read state updates correctly; cross-user access is denied. | Not run | Pass|
| AT-12 | Logout and authorization | Log out and try to open a protected page or call a protected API. | User is logged out and unauthenticated requests are rejected. | Not run | Pass|
| AT-13 | Docker startup | Run `docker compose config --quiet`, then `docker compose up --build`. | Compose configuration validates and frontend, backend and database containers start without persistent crash loops. | Not run | Pass|
| AT-14 | Health and connectivity | Open the configured frontend and call the backend health endpoint, if provided. Inspect container logs. | Frontend loads; health endpoint responds as documented; backend connects to MongoDB. | Not run |Pass |

## Evidence checklist

- [ ] Screenshot of successful registration/login (use a test account).
- [ ] Screenshot of doubt and answer flow.
- [ ] Screenshot of tutor search and rating summary.
- [ ] Screenshot of booking status and review submission.
- [ ] Screenshot of notifications.
- [ ] Docker Compose startup output or a redacted log excerpt.
- [ ] Link to the CI run for the tested commit.
- [ ] GitHub issue links for failures, if any.

## Defect log

| Test ID | Observed result | Severity | GitHub issue | Fix commit | Retest result |
|---|---|---|---|---|---|
| | | | | | |

## Sign-off

| Role | Name | Date | Comments |
|---|---|---|---|
| Student / tester | | | |
| Project guide (if reviewed) | | | |

**Integrity note:** CI results demonstrate only the checks actually executed by the workflow. Manual acceptance results, guide feedback, sprint ceremonies and deployment evidence must be recorded only after they occur.
