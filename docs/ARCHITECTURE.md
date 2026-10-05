# EduBridge Architecture

## 1. Overview

EduBridge follows a simple three-layer web architecture:

```text
React / Vite
     │
     │ HTTP + JSON
     ▼
Express REST API
     │
     │ Mongoose
     ▼
MongoDB
```

## 2. Frontend

The React client provides:

- authentication screens
- student dashboard
- doubt board and answer flow
- tutor discovery
- booking management
- notifications
- profile management
- session review UI

Axios attaches the JWT bearer token to authenticated API requests.

## 3. Backend

The Express API is organised by business capability:

- `routes/auth.js` — registration, login and profile
- `routes/doubts.js` — academic questions and answers
- `routes/tutors.js` — tutor discovery
- `routes/bookings.js` — tutoring requests and session lifecycle
- `routes/notifications.js` — in-app notifications
- `routes/reviews.js` — session reviews and tutor ratings

The `auth` middleware validates JWTs before protected operations.

## 4. Data model

Core entities:

- **User** — identity, college, subjects, skills, availability and reputation
- **Doubt** — academic question, author, tags, answers and status
- **Booking** — learner, tutor, schedule, mode and lifecycle status
- **Notification** — recipient, event type, message and read state
- **Review** — completed booking, learner, tutor, rating and feedback

## 5. Security boundaries

- Passwords are never returned in public user payloads.
- Protected routes require a valid bearer token.
- Booking actions verify the authenticated user owns the relevant learner/tutor role.
- Notification reads are restricted to the recipient.
- Review submission is restricted to the learner of a completed booking.
- Request payloads have explicit size and field-length validation.
- CORS and basic browser security headers are configured centrally.

## 6. CI/CD quality gate

GitHub Actions currently:

1. validates Docker Compose
2. builds backend and frontend images
3. installs dependencies with `npm ci`
4. checks backend JavaScript syntax
5. runs backend automated tests against MongoDB
6. builds the production frontend bundle

Manual browser acceptance remains a separate academic verification step.
