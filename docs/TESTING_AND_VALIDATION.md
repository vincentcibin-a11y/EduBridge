# Testing and Validation — EduBridge

This document defines the test strategy and provides registers for actual execution. Every outcome must be tied to a real test run and commit SHA. Automated test coverage, manual acceptance testing and CI results are separate forms of evidence.

## 1. Test environment register

| Field | Actual value |
|---|---|
| Test date / tester | To be recorded for each run |
| Git commit SHA | To be recorded for each run |
| OS / browser | To be recorded for manual tests |
| Node.js / npm versions | To be recorded |
| MongoDB version / test database | To be recorded; never include credentials |
| Backend / frontend URLs | To be recorded |
| Test command / run ID | To be recorded |
| CI workflow URL | https://github.com/vincentcibin-a11y/EduBridge/actions |

## 2. Testing levels

1. **Unit and middleware tests:** validation, authentication, authorization and business rules.
2. **API tests:** endpoints, response codes, payload validation and ownership restrictions.
3. **Integration tests:** connected application workflows with MongoDB.
4. **Regression tests:** re-run relevant cases after fixes and sprint integration.
5. **Manual acceptance tests:** demonstrate UI workflows in a browser and retain dated evidence.
6. **Build/CI validation:** compile frontend, syntax-check backend and execute configured workflow jobs.

## 3. Functional test catalogue

| Test ID | Module | Scenario | Expected result | Execution status / evidence |
|---|---|---|---|---|
| AUTH-01 | Authentication | Register with valid values | Account created with hashed password | To be recorded after run |
| AUTH-02 | Authentication | Missing/invalid registration values | Safe validation response | To be recorded after run |
| AUTH-03 | Authentication | Valid login | Authenticated response/token | To be recorded after run |
| AUTH-04 | Authorization | Protected endpoint without valid token | Request denied | To be recorded after run |
| PROF-01 | Profile | Update valid profile details | Profile persists and is returned | To be recorded after run |
| DOUBT-01 | Doubts | Create and retrieve a valid doubt | Doubt saved with author | To be recorded after run |
| DOUBT-02 | Answers | Submit an answer | Answer stored and attributed | To be recorded after run |
| DOUBT-03 | Validation | Malformed ID or invalid content | Safe client error returned | To be recorded after run |
| TUTOR-01 | Tutor search | Search by subject/skill | Matching tutors returned; own account excluded | To be recorded after run |
| BOOK-01 | Booking | Create a valid future request | Booking enters Pending | To be recorded after run |
| BOOK-02 | Booking | Assigned tutor accepts/rejects pending request | Correct transition and notification | To be recorded after run |
| BOOK-03 | Booking | Unauthorized or invalid transition | Request denied | To be recorded after run |
| BOOK-04 | Booking | Complete accepted session | Completed state set once | To be recorded after run |
| NOTIF-01 | Notifications | Mark one/all read | Only own notifications updated | To be recorded after run |
| REV-01 | Reviews | Review eligible completed booking | Review stored and tutor summary updated | To be recorded after run |
| REV-02 | Reviews | Duplicate/ineligible review | Request rejected | To be recorded after run |
| BUILD-01 | Frontend | Production build | Vite build completes | To be recorded after run |
| CI-01 | CI | Push/PR workflow | Configured checks complete | Record actual workflow URL and status |

## 4. Test execution log

| Date/time | Commit SHA | Test IDs / command | Environment | Pass / Fail / Blocked | Actual result and evidence |
|---|---|---|---|---|---|
| To be entered after a real run | | | | | |

## 5. Defect register

| Defect ID | Date found | Description | Severity | Reproduction steps | Fix commit / issue | Retest result |
|---|---|---|---|---|---|---|
| To be entered when a defect is found | | | | | | |

## 6. Manual evidence register

| Evidence ID | Scenario | Screenshot / log | Date captured | Tested commit |
|---|---|---|---|---|
| AT-01 onward | Record each acceptance flow | Link only to evidence actually captured | | |

Screenshots already stored in `docs/evidence/` may be referenced after confirming when and against which build they were captured. A screenshot proves only the visible state, not every related edge case.

## 7. Test commands

Run from the repository root:

```bash
npm --prefix backend test
npm --prefix frontend run build
npm run check
```

Backend integration tests require the configured test database. GitHub Actions provisions a MongoDB service for CI. Capture actual output and environment versions for the submission record.

## 8. CI and deployment distinction

Current CI configuration validates the Compose configuration, builds Docker images, installs dependencies, checks backend syntax, runs backend tests against a MongoDB service and builds the frontend. This is continuous integration and build validation only.

A production deployment is a separate stage. To claim deployment, record:
- Approved hosting provider and environment.
- Release commit/tag and deployment date.
- Protected production database and JWT secret configuration.
- HTTPS and CORS configuration.
- Deployed URL.
- Health/smoke-test output and rollback procedure.

## 9. Final test readiness

- All must-have backlog items have corresponding executed tests.
- Critical negative and authorization cases are covered.
- Regression testing is repeated after fixes.
- Manual UI workflows are demonstrated on the final candidate.
- Evidence points to the correct commit.
- Failures and unresolved limitations are disclosed.
- CI status is checked on the final submitted commit.
