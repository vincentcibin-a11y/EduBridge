# EduBridge

### A Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform

EduBridge is a **college-exclusive peer-learning platform** designed to connect students who need academic help with knowledgeable students from the same college. It supports doubt solving, peer tutor discovery, and structured online or offline tutoring sessions within the campus.

> **Core idea:** Every student can be both a learner and a peer tutor.

---

## Project Overview

Students often face unresolved doubts while preparing for university examinations. Although many students in the same college may already understand those topics, there is no organized way to discover and connect with them.

EduBridge provides a centralized academic-support environment where students can:

- Post academic doubts by subject and topic
- Receive answers from fellow students
- Search previously solved doubts
- Discover peer tutors based on expertise and availability
- Request online or offline tutoring sessions
- Schedule tutoring at a suitable campus location
- Share academic resources
- Provide ratings and feedback

---

## Problem Statement

Existing methods such as messaging groups, personal contacts, and informal discussions do not provide structured doubt management, tutor discovery, availability information, session scheduling, or a reliable reputation system.

EduBridge addresses this gap by creating a dedicated platform for organized peer-to-peer academic support within the college.

---

## User Roles

### Learner
- Create and post doubts
- Search answers and resources
- Find suitable peer tutors
- Send tutoring requests
- Schedule sessions
- Submit feedback

### Peer Tutor
- Create a tutor profile
- Select subjects and topics of expertise
- Set availability
- Answer doubts
- Accept or reject tutoring requests
- Conduct online or offline sessions
- Build reputation through feedback

### Administrator
- Manage users and subjects
- Monitor doubts, reports, and resources
- Manage platform content
- Maintain a safe and reliable learning environment

A verified student can act as both a **Learner** and a **Peer Tutor**.

---

## Main Modules

1. **Authentication & Profile** – Registration, college verification, login, and student profiles.
2. **Doubt Management** – Create, view, search, update, and resolve academic doubts.
3. **Peer Answer Management** – Answers, replies, upvotes, and accepted answers.
4. **Peer Tutor Management** – Tutor expertise, availability, profiles, and discovery.
5. **Offline Tutoring & Booking** – Tutoring requests, acceptance, scheduling, location, and completion.
6. **Chat & Notifications** – Communication and session-related alerts.
7. **Academic Resources** – Notes, PDFs, and previous-year study materials.
8. **Ratings, Reputation & Administration** – Feedback, reputation points, badges, reports, and administration.

---

## System Workflow

```text
Register
   ↓
College Verification
   ↓
Create Profile
   ↓
Ask Doubt / Search Doubts
   ↓
Discover Peer Tutor
   ↓
Send Tutoring Request
   ↓
Tutor Accepts or Rejects
   ↓
Schedule Date, Time & Campus Location
   ↓
Online / Offline Tutoring Session
   ↓
Rating, Feedback & Reputation
```

### Example Use Case

A student has a doubt about DBMS normalization. The student posts the doubt or searches for a DBMS peer tutor. After finding a suitable tutor, the student sends a request. Once accepted, both students schedule a session in an approved campus location such as the library. After the session, the learner can submit feedback.

---

## Planned Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, HTML5, CSS3, JavaScript, Tailwind CSS |
| Backend | Node.js, Express.js, REST APIs |
| Database | MongoDB |
| Authentication | JWT |
| Real-time Communication | Socket.IO |
| Version Control | Git and GitHub |
| Deployment | Vercel / Render |

> The stack above represents the planned implementation direction. Update this section if the implemented technologies change.

---

## Development Methodology

The project follows an Agile development approach using the Scrum framework:

- Requirement identification and product backlog
- UI and database design
- Incremental development through sprints
- Regular testing and validation
- Version control using Git
- Periodic review and demonstration

---

## Expected Outcomes

- Faster resolution of academic doubts
- Improved peer-to-peer learning
- Better discovery of knowledgeable students
- Organized offline academic support
- Reusable repository of solved doubts
- Recognition for helpful peer tutors
- Stronger academic collaboration within the college

---

## Future Scope

- AI-assisted doubt hints
- OCR for handwritten questions
- Video tutoring
- Faculty-recommended tutors
- Mobile application
- Advanced tutor matching
- College LMS integration
- Expansion to multiple colleges

---

## Project Status

This repository is being developed as part of an MCA mini project. Features and modules will be implemented incrementally and documented as development progresses.

## Author

**Cibin Vincent**  
MCA & FIT25MCA-2028  
GitHub: [vincentcibin-a11y](https://github.com/vincentcibin-a11y)
