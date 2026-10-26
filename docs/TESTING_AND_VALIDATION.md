# Testing and Validation Log — EduBridge

This file is the **Testing & Validation** record for 20MCA246. The cases below are a plan, not assertions that the tests have passed.

## Environment record
- Date / tester: TO BE RECORDED
- Git commit SHA: TO BE RECORDED
- OS / browser: TO BE RECORDED
- Node.js / npm versions: TO BE RECORDED
- Database and test dataset: TO BE RECORDED (never include credentials)
- Backend URL / frontend URL: TO BE RECORDED
- Test command and output log: TO BE RECORDED
- CI run URL, if applicable: TO BE RECORDED

## Functional test catalogue

| Test ID | Module | Test scenario | Expected result | Actual result / status / evidence |
|---|---|---|---|---|
| AUTH-01 | Authentication | Register with valid fields | Account created and safe success response | TO BE RECORDED |
| AUTH-02 | Authentication | Register with invalid/missing fields | Request rejected with validation error | TO BE RECORDED |
| AUTH-03 | Authentication | Login with valid credentials | Authenticated response returned | TO BE RECORDED |
| AUTH-04 | Authorization | Call protected endpoint without valid token | Request rejected | TO BE RECORDED |
| PROF-01 | Profile | Update profile with valid data | Profile saved and returned | TO BE RECORDED |
| DOUBT-01 | Doubts | Create a valid academic doubt | Doubt is persisted and visible to authorized users | TO BE RECORDED |
| DOUBT-02 | Doubts | Submit answer to an existing doubt | Answer is recorded with author attribution | TO BE RECORDED |
| DOUBT-03 | Doubts | Submit malformed ID/invalid content | Safe validation error returned | TO BE RECORDED |
| TUTOR-01 | Tutor search | Search by subject/skill | Matching profiles returned | TO BE RECORDED |
| BOOK-01 | Booking | Create a valid future tutoring request | Booking enters pending state | TO BE RECORDED |
| BOOK-02 | Booking | Tutor accepts pending request | Status changes according to rules and notification is issued | TO BE RECORDED |
| BOOK-03 | Booking | Tutor rejects pending request | Rejection stored; invalid subsequent completion is denied | TO BE RECORDED |
| BOOK-04 | Booking | Complete accepted session | Status becomes completed once | TO BE RECORDED |
| NOTIF-01 | Notifications | Mark individual notification read | Only the authorized user's notification changes | TO BE RECORDED |
| NOTIF-02 | Notifications | Mark all notifications read | All eligible notifications for current user become read | TO BE RECORDED |
| REV-01 | Reviews | Review a completed session with valid rating | Review stored and tutor summary updated | TO BE RECORDED |
| REV-02 | Reviews | Review incomplete/other user's booking or duplicate review | Operation rejected | TO BE RECORDED |
| BUILD-01 | Frontend | Run production build | Build completes successfully | TO BE RECORDED |
| INTEG-01 | End-to-end | Register two users through review workflow | Data and status changes persist across modules | TO BE RECORDED |
| SEC-01 | Security | Attempt cross-user access to a user-owned resource | Access denied without leaking private data | TO BE RECORDED |

## Actual execution log

| Date/time | Commit SHA | Command or manual scenario | Environment | Result (Pass/Fail/Blocked) | Log/screenshot/CI URL | Defect ID / action |
|---|---|---|---|---|---|---|
| TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED |

## Defect log

| Defect ID | Date found | Summary | Severity | Steps to reproduce | Fix commit | Retest result |
|---|---|---|---|---|---|---|
| TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED |

## Test commands
From repository root:

```bash
cd backend
npm ci
npm test
cd ../frontend
npm ci
npm run build
```

Run tests in the intended environment. MongoDB-backed integration tests need an available test database. Record exact failures rather than replacing them with expected output.

## Acceptance evidence
For each manual scenario, capture the actual browser state using the guide in `docs/evidence/README.md`. Remove or mask emails, tokens, passwords and personal student data. Include date, browser/environment and scenario name. Avoid adding confidential production data to a public repository.
