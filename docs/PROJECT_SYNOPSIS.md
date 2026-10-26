# Project Synopsis — EduBridge
## 20MCA246 Main Project

**Title:** EduBridge — Peer-to-Peer Academic Doubt Solving and Student Tutoring Platform  
**Student:** Cibin Vincent  
**Programme / Institution:** MCA, Federal Institute of Science and Technology (FISAT), Angamaly  
**Internal Guide / Product Owner:** TO BE CONFIRMED BY DEPARTMENT  
**External Customer / Guide (if applicable):** TO BE RECORDED  
**Date of submission / approval:** TO BE RECORDED

## 1. Introduction
EduBridge is a web-based peer-learning system designed to connect students who need academic support with peers who have relevant subject knowledge. It brings academic doubts, peer answers, tutor discovery, tutoring requests, notifications and post-session feedback into a single platform.

## 2. Problem statement
Students frequently need explanations outside scheduled class hours, but academic questions and peer expertise are often scattered across informal communication channels. It can be difficult to identify a suitable peer tutor, coordinate a session and keep track of the request and its outcome. EduBridge aims to provide a structured student-to-student support workflow.

## 3. Objectives
1. Provide student registration, login and profile management.
2. Let students post academic doubts and answer questions.
3. Support tutor discovery by relevant subject and skills.
4. Allow learners to request tutoring sessions and tutors to accept or reject requests.
5. Track booking states and notify users about relevant events.
6. Support ratings and feedback for completed sessions.
7. Apply software engineering practices: requirements analysis, design, iterative development, version control, testing, documentation and deployment validation.

## 4. Proposed scope
The MVP covers authenticated student workflows, profiles, doubts/answers, tutor search, session booking and status management, notifications, and reviews. Real-time chat, file/resource sharing, advanced moderation, detailed analytics and production-scale deployment are considered future enhancements unless explicitly completed and tested.

## 5. Intended users and stakeholders
- **Student/learner:** creates doubts, searches for peer assistance, requests sessions, and reviews completed tutoring.
- **Peer tutor:** maintains profile and expertise, answers questions, and responds to tutoring requests.
- **Project Guide/Product Owner:** clarifies requirements, reviews increments and approves scope.
- **Scrum Master:** monitors progress, removes blockers and maintains review cadence.
- **Other stakeholders:** student users and relevant faculty consulted during requirements discovery.

Record stakeholder conversations only after they actually occur. Include date, role (with consent), key requirement, decision and resulting backlog item.

## 6. Technology and architecture
- Frontend: React, Vite, responsive CSS and Axios.
- Backend: Node.js and Express REST API.
- Persistence: MongoDB and Mongoose.
- Authentication: JWT and bcrypt password hashing.
- Development and delivery: Git/GitHub, GitHub Actions and Docker Compose.
- Testing: automated backend API/integration tests, frontend production build and recorded manual acceptance tests.

The frontend calls the API; the API validates requests, enforces authentication/authorization and business rules, and accesses persistent data through Mongoose models.

## 7. Methodology
Use Scrum with **two-week sprints**, brief progress meetings about every three days when practical, and a review/demo at the end of each sprint. Maintain four dated Scrum Book sections: (i) Product Backlog, (ii) Database & UI Design, (iii) Testing & Validation and (iv) Details of Versions. Record guide feedback and corrections with dates. Sprint dates must be aligned with the actual academic calendar.

## 8. Testing and validation approach
Testing should include valid/invalid registration and login, protected-route access, profile updates, doubt creation/search/answers, tutor discovery, booking accept/reject/completion and invalid-state attempts, notification read state, review eligibility and duplicate-review prevention, frontend builds and an end-to-end demonstration. For each test run, record test ID, date, environment, steps, expected result, actual result, pass/fail, defect reference and evidence link. Do not mark a test passed without executing it.

## 9. Deliverables
1. Approved synopsis and requirements.
2. Working, version-controlled application.
3. Architecture, database design and UI documentation.
4. Dated Scrum Book and sprint review records.
5. Automated/manual testing and validation evidence.
6. Setup/deployment documentation and health-check evidence.
7. Final project report, review presentation and demonstration.

## 10. Expected outcome
A usable academic peer-learning prototype that demonstrates integrated frontend/backend/database modules and a structured doubt-to-tutoring workflow. The final report must describe the actual implementation, test outcomes, limitations and deployment environment used.

## 11. Limitations and future work
Potential future work includes real-time chat, resource uploads, institution verification, improved moderation, accessibility evaluation, analytics and a secured production deployment.

## 12. Approval record
**Supervisor decision:** TO BE RECORDED  
**Comments / requested changes:** TO BE RECORDED  
**Approval date:** TO BE RECORDED  
**Student signature / supervisor signature:** Complete as required by the institution; do not insert fabricated signatures.
