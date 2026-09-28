# EduBridge Manual Testing Evidence

Save screenshots captured during actual manual acceptance testing in this folder.

## Suggested filenames

- `01-homepage.png` — dashboard after successful login
- `02-registration-login.png` — registration and login
- `03-profile.png` — profile update persisted after refresh
- `04-doubt.png` — doubt created and displayed
- `05-answer.png` — answer displayed under the doubt
- `06-tutor-search.png` — tutor search results
- `07-booking-pending.png` — new booking request
- `08-booking-status.png` — accepted/rejected booking status
- `09-session-completed.png` — completed session
- `10-review-rating.png` — review and tutor rating summary
- `11-notifications.png` — notification read/unread state
- `12-docker.png` — Docker Compose containers running
- `13-health.png` — frontend and backend health/connectivity

A screenshot may support more than one test. Only add screenshots that you actually captured. Record Pass/Fail in [Manual Acceptance Test Evidence](../Manual_Acceptance_Test_Evidence.md) based on the observed result, and refer to the relevant filename in the evidence/notes column.

## Privacy and integrity

- Use test accounts and fictional test data.
- Do not capture passwords, authentication tokens, private user data, or secret environment variables.
- Do not mark a test as passed without running it.
- If a test fails, record the observed behaviour and link a GitHub issue if one is created.
