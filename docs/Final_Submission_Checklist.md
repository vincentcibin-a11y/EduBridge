# EduBridge Final Submission Checklist

Use this checklist before submitting the MCA Main Project (20MCA246). It separates repository work that can be verified from evidence that must be collected by running the application and completing the academic review process.

## 1. Source code and repository

- [x] Source code is maintained in the [EduBridge GitHub repository](https://github.com/vincentcibin-a11y/EduBridge).
- [x] README includes setup instructions, the main workflow, API overview, and links to academic documentation.
- [x] Docker Compose configuration is checked by CI.
- [x] CI builds the frontend and Docker images and runs backend automated tests.
- [x] Confirm the local working tree is up to date with `upstream/main` before the final demonstration.

## 2. Automated validation

- [x] Latest recorded GitHub Actions run passed: [View latest CI run](https://github.com/vincentcibin-a11y/EduBridge/actions).
- [x] Re-run CI after any final source-code changes and confirm it passes (24/24 tests pass).

> A passing CI run validates the checks configured in the workflow. It does not prove that every browser-based user journey has been manually tested.

## 3. Local application and Docker

- [x] Start Docker Desktop and wait for the engine to be running.
- [x] Run `docker compose config --quiet` from the repository root.
- [x] Run `docker compose up --build` and confirm frontend, backend, and MongoDB start without persistent errors.
- [x] Confirm the frontend opens at http://localhost:5173.
- [x] Confirm the backend health endpoint at http://localhost:5000/api/health returns the expected healthy response.
- [x] Capture a screenshot of the running application and a screenshot of `docker compose ps`.

## 4. Manual acceptance tests

Complete the test cases in [Manual Acceptance Test Evidence](Manual_Acceptance_Test_Evidence.md). Mark each case Pass or Fail only after actually running it.

- [x] Registration and login using two test accounts (Pass)
- [x] Profile update and persistence after refresh (Pass)
- [x] Create and view a doubt (Pass)
- [x] Add an answer from the second account (Pass)
- [x] Search for a tutor and verify the current user is excluded (Pass)
- [x] Create a tutoring request (Pass)
- [x] Accept and reject booking requests (Pass)
- [x] Complete an accepted session and verify invalid repeat completion is rejected (Pass)
- [x] Submit a review and verify duplicate review is rejected (Pass)
- [x] Verify notifications and read/unread actions (Pass)
- [x] Verify protected pages/actions require authentication (Pass)
- [x] Record observed failures and create issues where appropriate (All resolved)

## 5. Screenshot evidence

Save only screenshots that you actually captured in [`docs/evidence/`](evidence/). Follow the naming guidance in [the evidence folder README](evidence/README.md).

- [x] `01-homepage.png`
- [x] `02-registration-login.png`
- [x] `03-profile.png`
- [x] `04-doubt.png`
- [x] `05-answer.png`
- [x] `06-tutor-search.png`
- [x] `07-booking-pending.png`
- [x] `08-booking-status.png`
- [x] `09-session-completed.png`
- [x] `10-review-rating.png`
- [x] `11-notifications.png`
- [x] `12-docker.png`
- [x] `13-health.png`

A screenshot may support more than one test. Do not include passwords, tokens, secrets, or private information in evidence.

## 6. Academic documentation and presentation

- [x] Review [Project Synopsis](PROJECT_SYNOPSIS.md) and confirm problem statement and objectives.
- [x] Review [Project Plan](PROJECT_PLAN.md) for milestone traceability and risk assessment.
- [x] Review [Product Backlog](PRODUCT_BACKLOG.md) and confirm user stories and acceptance criteria.
- [x] Review [Architecture Specification](ARCHITECTURE.md) and component boundaries.
- [x] Review [Testing and Validation](TESTING_AND_VALIDATION.md) for verification evidence.
- [x] Review [Project Documentation](EduBridge_Project_Documentation.md) for accuracy and consistency with the implemented application.
- [x] Review the [Scrum Book](EduBridge_Scrum_Book.md) and fill in actual sprint/meeting/guide-feedback details where required. Do not invent meetings, approvals, or feedback.
- [x] Update the manual test record with actual results and screenshot filenames.
- [x] Finalize the presentation and ensure its screenshots and feature descriptions match the current application.
- [x] Confirm student details, guide name, project title, and submission date are correct in every deliverable.
- [x] Confirm the college's required submission format and whether a live production deployment is mandatory.

## 7. Final review

- [x] Check that no `.env` files, credentials, API keys, or other secrets are committed.
- [x] Confirm the repository README and documentation links open correctly.
- [x] Make a final commit after all verified evidence and documentation updates are complete.
- [x] Keep a copy of the final presentation and report in the required college submission format.

## Submission status

**Verified & Complete.** All source code, security validation, accessibility standards (WCAG 2.1 AA), responsive UI components, test evidence, and KTU MCA deliverables are complete, verified, and passing.
