# EduBridge Final Submission Checklist

Use this checklist before submitting the MCA mini project. It separates repository work that can be verified from evidence that must be collected by running the application and completing the academic review process.

## 1. Source code and repository

- [x] Source code is maintained in the [EduBridge GitHub repository](https://github.com/vincentcibin-a11y/EduBridge).
- [x] README includes setup instructions, the main workflow, API overview, and links to academic documentation.
- [x] Docker Compose configuration is checked by CI.
- [x] CI builds the frontend and Docker images and runs backend automated tests.
- [ ] Confirm the local working tree is up to date with `origin/main` before the final demonstration.

## 2. Automated validation

- [x] Latest recorded GitHub Actions run passed: [View latest CI run](https://github.com/vincentcibin-a11y/EduBridge/actions).
- [ ] Re-run CI after any final source-code changes and confirm it passes.

> A passing CI run validates the checks configured in the workflow. It does not prove that every browser-based user journey has been manually tested.

## 3. Local application and Docker

- [ ] Start Docker Desktop and wait for the engine to be running.
- [ ] Run `docker compose config --quiet` from the repository root.
- [ ] Run `docker compose up --build` and confirm frontend, backend, and MongoDB start without persistent errors.
- [ ] Confirm the frontend opens at http://localhost:5173.
- [ ] Confirm the backend health endpoint at http://localhost:5000/api/health returns the expected healthy response.
- [ ] Capture a screenshot of the running application and a screenshot of `docker compose ps`.

## 4. Manual acceptance tests

Complete the test cases in [Manual Acceptance Test Evidence](Manual_Acceptance_Test_Evidence.md). Mark each case Pass or Fail only after actually running it.

- [ ] Registration and login using two test accounts
- [ ] Profile update and persistence after refresh
- [ ] Create and view a doubt
- [ ] Add an answer from the second account
- [ ] Search for a tutor and verify the current user is excluded
- [ ] Create a tutoring request
- [ ] Accept and reject booking requests
- [ ] Complete an accepted session and verify invalid repeat completion is rejected
- [ ] Submit a review and verify duplicate review is rejected
- [ ] Verify notifications and read/unread actions
- [ ] Verify protected pages/actions require authentication
- [ ] Record observed failures and create issues where appropriate

## 5. Screenshot evidence

Save only screenshots that you actually captured in [`docs/evidence/`](evidence/). Follow the naming guidance in [the evidence folder README](evidence/README.md).

- [ ] `01-homepage.png`
- [ ] `02-registration-login.png`
- [ ] `03-profile.png`
- [ ] `04-doubt.png`
- [ ] `05-answer.png`
- [ ] `06-tutor-search.png`
- [ ] `07-booking-pending.png`
- [ ] `08-booking-status.png`
- [ ] `09-session-completed.png`
- [ ] `10-review-rating.png`
- [ ] `11-notifications.png`
- [ ] `12-docker.png`
- [ ] `13-health.png`

A screenshot may support more than one test. Do not include passwords, tokens, secrets, or private information in evidence.

## 6. Academic documentation and presentation

- [ ] Review [Project Documentation](EduBridge_Project_Documentation.md) for accuracy and consistency with the implemented application.
- [ ] Review the [Scrum Book](EduBridge_Scrum_Book.md) and fill in actual sprint/meeting/guide-feedback details where required. Do not invent meetings, approvals, or feedback.
- [ ] Update the manual test record with actual results and screenshot filenames.
- [ ] Finalize the presentation and ensure its screenshots and feature descriptions match the current application.
- [ ] Confirm student details, guide name, project title, and submission date are correct in every deliverable.
- [ ] Confirm the college's required submission format and whether a live production deployment is mandatory.

## 7. Final review

- [ ] Check that no `.env` files, credentials, API keys, or other secrets are committed.
- [ ] Confirm the repository README and documentation links open correctly.
- [ ] Make a final commit after all verified evidence and documentation updates are complete.
- [ ] Keep a copy of the final presentation and report in the required college submission format.

## Submission status

This checklist is a working guide, not a claim that all items have passed. Complete the unchecked items that apply to your college's requirements and retain the actual test evidence.
