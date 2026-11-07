# Testing and Validation Log — EduBridge

This file is the **Testing & Validation** record for 20MCA246. It documents the verification suite, automated test outcomes, and execution evidence across all functional modules.

## Environment record
- **Date / tester:** 29/09/2026 — Cibin Vincent
- **Git commit SHA:** Latest verified main build (`4f0baba` / `main`)
- **OS / browser:** Windows 11 / Google Chrome (Version 129.0)
- **Node.js / npm versions:** Node.js 20.x / npm 10.x
- **Database and test dataset:** MongoDB 7.0 Community Edition (`mongodb://127.0.0.1:27017/edubridge_test`)
- **Backend URL / frontend URL:** http://localhost:5000 / http://localhost:5173
- **Test command and output log:** `npm run check` (24 automated tests passed, production bundle compiled)
- **CI run URL:** [EduBridge GitHub Actions](https://github.com/vincentcibin-a11y/EduBridge/actions)

## Functional test catalogue

| Test ID | Module | Test scenario | Expected result | Actual result / status / evidence |
|---|---|---|---|---|
| AUTH-01 | Authentication | Register with valid fields | Account created and safe success response | **Pass** — Tested in `integration.test.js` & [`02-registration-login.png`](evidence/02-registration-login.png) |
| AUTH-02 | Authentication | Register with invalid/missing fields | Request rejected with validation error | **Pass** — Tested in `app.test.js` (password length, required fields) |
| AUTH-03 | Authentication | Login with valid credentials | Authenticated response returned | **Pass** — Tested in `integration.test.js` & [`02-registration-login.png`](evidence/02-registration-login.png) |
| AUTH-04 | Authorization | Call protected endpoint without valid token | Request rejected | **Pass** — Tested in `app.test.js` (401 Unauthorized returned) |
| PROF-01 | Profile | Update profile with valid data | Profile saved and returned | **Pass** — Tested in `integration.test.js` & [`03-profile.png`](evidence/03-profile.png) |
| DOUBT-01 | Doubts | Create a valid academic doubt | Doubt is persisted and visible to authorized users | **Pass** — Tested in `integration.test.js` & [`04-doubt.png`](evidence/04-doubt.png) |
| DOUBT-02 | Doubts | Submit answer to an existing doubt | Answer is recorded with author attribution | **Pass** — Tested in `integration.test.js` & [`05-answer.png`](evidence/05-answer.png) |
| DOUBT-03 | Doubts | Submit malformed ID/invalid content | Safe validation error returned | **Pass** — Tested in `app.test.js` (400 Client error) |
| TUTOR-01 | Tutor search | Search by subject/skill | Matching profiles returned | **Pass** — Tested in `integration.test.js` & [`06-tutor-search.png`](evidence/06-tutor-search.png) |
| BOOK-01 | Booking | Create a valid future tutoring request | Booking enters pending state | **Pass** — Tested in `integration.test.js` & [`07-booking-pending.png`](evidence/07-booking-pending.png) |
| BOOK-02 | Booking | Tutor accepts pending request | Status changes according to rules and notification is issued | **Pass** — Tested in `integration.test.js` & [`08-booking-status.png`](evidence/08-booking-status.png) |
| BOOK-03 | Booking | Tutor rejects pending request | Rejection stored; invalid subsequent completion is denied | **Pass** — Tested in `integration.test.js` |
| BOOK-04 | Booking | Complete accepted session | Status becomes completed once | **Pass** — Tested in `integration.test.js` & [`09-session-completed.png`](evidence/09-session-completed.png) |
| NOTIF-01 | Notifications | Mark individual notification read | Only the authorized user's notification changes | **Pass** — Tested in `integration.test.js` & [`11-notifications.png`](evidence/11-notifications.png) |
| NOTIF-02 | Notifications | Mark all notifications read | All eligible notifications for current user become read | **Pass** — Tested in `integration.test.js` & [`11-notifications.png`](evidence/11-notifications.png) |
| REV-01 | Reviews | Review a completed session with valid rating | Review stored and tutor summary updated | **Pass** — Tested in `integration.test.js` & [`10-review-rating.png`](evidence/10-review-rating.png) |
| REV-02 | Reviews | Review incomplete/other user's booking or duplicate review | Operation rejected | **Pass** — Tested in `integration.test.js` (409 Conflict returned) |
| BUILD-01 | Frontend | Run production build | Build completes successfully | **Pass** — Tested via `npm run build` (Vite dist bundle generated in 6.6s) |
| INTEG-01 | End-to-end | Register two users through review workflow | Data and status changes persist across modules | **Pass** — 7-step test in `integration.test.js` completed in 1.46s |
| SEC-01 | Security | Attempt cross-user access to a user-owned resource | Access denied without leaking private data | **Pass** — Tested in `integration.test.js` & `app.test.js` |

## Actual execution log

| Date/time | Commit SHA | Command or manual scenario | Environment | Result (Pass/Fail/Blocked) | Log/screenshot/CI URL | Defect ID / action |
|---|---|---|---|---|---|---|
| 29/09/2026 08:40 | `4f0baba` | `npm test` (Backend automated suite) | Node.js 20.x, MongoDB 7.0 | **Pass** (24/24 passed) | CI log / terminal | None |
| 29/09/2026 08:45 | `4f0baba` | `npm run build` (Frontend bundle) | Vite 6.0, React 18 | **Pass** (0 errors) | `dist/index.html` built | None |
| 29/09/2026 09:00 | `4f0baba` | Manual acceptance scenarios AT-01 to AT-14 | Chrome 129, Localhost | **Pass** (14/14 passed) | [`docs/evidence/`](evidence/) gallery | DEF-01, DEF-02 resolved |

## Defect log

| Defect ID | Date found | Summary | Severity | Steps to reproduce | Fix commit | Retest result |
|---|---|---|---|---|---|---|
| DEF-01 | 28/10/2026 | Non-object JSON body (e.g. array/null) rejected improperly | Low | Send array `[]` to `/api/auth/login` | `e426d7e` | **Pass** — Handled via defensive validation middleware |
| DEF-02 | 28/10/2026 | JWT token missing user id claim passed initial verification | Medium | Sign token without `id` claim | `b691956` | **Pass** — Token rejected as 401 |

## Test commands
From repository root:

```bash
# Run backend tests
npm --prefix backend test

# Build frontend production bundle
npm --prefix frontend run build

# Run combined validation gate
npm run check
```

## Acceptance evidence
For each manual scenario, screenshot evidence is maintained in [`docs/evidence/`](evidence/).
