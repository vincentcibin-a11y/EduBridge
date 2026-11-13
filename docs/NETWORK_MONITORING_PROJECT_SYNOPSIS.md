# Project Synopsis — NetPulse
## MCA Software Project (KTU-aligned)

**Proposed title:** NetPulse — A Web-Based Network Monitoring and Incident Management System  
**Student:** Cibin Vincent  
**Programme / Institution:** MCA, FISAT, Angamaly  
**Internal Guide / Product Owner:** To be confirmed by department  
**External stakeholder / customer:** To be recorded only after consultation  
**Repository:** https://github.com/vincentcibin-a11y/EduBridge (network-monitoring-project branch)

## 1. Introduction
NetPulse is a web-based network operations dashboard for small institutions, computer laboratories, and small-office networks. It provides a single place to register authorised network devices and services, run reachability checks, review availability and response-time trends, record incidents, and track alerts. The system uses a React interface, an Express REST API, and MongoDB persistence.

The current EduBridge repository is being used as the engineering baseline because it already provides authentication, a React/Node/MongoDB structure, Docker-based local deployment, automated CI, and project record templates. The product scope and user workflows are to be changed from peer tutoring to network operations.

## 2. Problem statement
In small computer labs and offices, network device status is often checked manually using separate command-line tools or spreadsheets. Outages may be noticed late, check results are not consistently recorded, and it can be difficult to review recurring failures or communicate incident status. A lightweight central dashboard can help an authorised operator maintain an inventory, monitor approved targets, retain check history, and coordinate incident response.

## 3. Aim
To analyse, design, implement, test, and deploy a secure web application that assists an authorised operator in monitoring a small network and managing network incidents.

## 4. Objectives
1. Gather requirements from a lab administrator, network technician, or other real stakeholder.
2. Register and manage authorised devices and service endpoints with labels, IP/hostname, location, and criticality.
3. Perform configurable reachability/availability checks for approved devices or HTTP(S) services.
4. Record check time, result, response duration, and error details.
5. Display device status, availability summaries, response-time trends, and recent failures.
6. Create and manage incidents with severity, owner, status, notes, and resolution details.
7. Generate alerts for state changes or threshold breaches, with configurable notification rules.
8. Apply Scrum, Git-based version control, automated testing, CI, containerisation, documentation, and deployment practices.

## 5. Scope
### Minimum viable product
- Secure operator registration/login and role-checked API access.
- Device/service inventory (create, view, update, deactivate).
- Manual on-demand monitoring for approved targets.
- Scheduled monitoring at a conservative configurable interval.
- Check history and dashboard summaries.
- Incident lifecycle: Open → Acknowledged → Resolved.
- In-app alerts for down/recovered state changes.
- Audit-friendly timestamps and export of a filtered CSV report.

### Explicit boundaries
- The project is intended for a lab or small-office network and not carrier-scale monitoring.
- Monitoring is restricted to targets the institution or operator owns or has explicit permission to assess. It will not include subnet scanning, stealth scanning, exploitation, credential collection, packet interception, or denial-of-service testing.
- ICMP/ping availability depends on deployment permissions and operating-system support. HTTP(S) checks are used for web services. Unsupported checks must report an honest status, not a false success.
- Email/SMS integrations, SNMP polling, topology discovery, mobile applications, and advanced anomaly detection are optional future work unless approved and implemented.

## 6. Stakeholders and requirements discovery
- **Network/Lab Administrator:** proposes device inventory fields, check intervals, severity levels, and incident workflow.
- **Operator/Technician:** uses monitoring dashboard, reviews alerts, and updates incidents.
- **Project Guide/Product Owner:** prioritises requirements and accepts sprint demonstrations.
- **Scrum Master:** monitors progress and removes blockers.
- **Student developer:** analyses, designs, implements, tests, documents, and deploys the product.

Conduct interviews or structured discussions before finalising requirements. Record actual date, stakeholder role (with consent), questions, responses, decisions, and related backlog IDs in the Scrum Book. Do not invent interview findings or customer approval.

## 7. Functional requirements
- FR-01: authenticate users and enforce role-based access.
- FR-02: create, edit, view, and deactivate monitored assets.
- FR-03: validate target syntax and reject unsafe or unauthorised target ranges.
- FR-04: execute manual reachability checks on a registered asset.
- FR-05: execute scheduled checks at a bounded interval.
- FR-06: persist check history and response durations.
- FR-07: calculate summary metrics from recorded checks.
- FR-08: create, assign, acknowledge, update, and resolve incidents.
- FR-09: create alerts for down/recovered transitions and rule breaches.
- FR-10: filter and export monitoring and incident reports.
- FR-11: provide health endpoints and operational logs.

## 8. Non-functional requirements
- Security: authentication, server-side validation, least privilege, rate limits, safe target allow-listing, secret management.
- Reliability: monitor workers must isolate per-target failures and avoid unbounded concurrency.
- Performance: dashboard and recent history should load efficiently for the defined project-scale dataset.
- Usability: responsive layout, clear status text, keyboard access, and accessible charts/tables.
- Maintainability: modular routes/models/services and documented configuration.
- Portability: reproducible local execution using Docker Compose.
- Testability: unit, API integration, validation, and manual acceptance tests.

## 9. Proposed technology stack
- Frontend: React 18, Vite, React Router, Axios, chart library (select after confirming licence and fit).
- Backend: Node.js 20, Express 4.
- Database: MongoDB 7 with Mongoose.
- Authentication: JWT and bcrypt.
- Monitoring: Node.js HTTP(S) probes; optional OS ping utility only for explicitly registered hosts and with timeout/allow-list controls.
- Quality and delivery: Git/GitHub, GitHub Actions, Docker Compose, Node test runner/Supertest (or existing compatible test setup).

## 10. High-level architecture
The React dashboard sends authenticated JSON requests to the Express API. The API validates identity, authorisation, target registration and request limits. A monitoring service performs bounded checks only for registered assets and writes immutable check-result records. A scheduler triggers due checks. Incident and alert services derive state transitions and notify operators. MongoDB stores users, assets, checks, incidents, and alerts.

## 11. Proposed data entities
- User: name, email, passwordHash, role, createdAt.
- Asset: name, target, type, location, criticality, enabled, checkIntervalSeconds, lastKnownState, owner.
- CheckResult: asset, checkedAt, status, responseTimeMs, errorCode, message, checkType.
- Incident: asset, title, severity, status, assignedTo, openedAt, acknowledgedAt, resolvedAt, resolutionNote.
- Alert: asset, incident, type, message, read, createdAt, recipient.

## 12. Development methodology
Use Scrum with two-week sprints, short progress meetings approximately every three days (under 15 minutes), and a review/demo at every sprint end (under 30 minutes). The guide acts as Product Owner if no external customer is appointed. Maintain the four required Scrum Book parts: (i) Product Backlog, (ii) Database & UI Design, (iii) Testing & Validation, and (iv) Details of Versions. Record dated decisions and feedback. Align the sprint calendar with the official KTU academic schedule.

## 13. Testing and validation
Test authentication and access control; asset validation; allow-list enforcement; probe success, timeout, DNS failure, HTTP error and unavailable host; scheduler bounds; history persistence; state transitions; alert generation; incident permissions; CSV export; health checks; frontend build; Docker startup; and CI. Record actual environment, steps, expected and actual results, pass/fail, defect ID, date, and evidence. Never mark a test as passed until it has been run.

## 14. Deployment
Run the frontend, API, and MongoDB using Docker Compose in a controlled development/demo environment. Configure secrets through environment variables. Verify API health, database connectivity, probe timeouts, and that the configured targets are authorised. Production hosting is subject to institutional approval and security review.

## 15. Expected outcome
A working prototype that gives an authorised operator visibility into registered network assets, recent availability, response-time history, alerts, and incident status. The report will describe measured results, limitations, and the actual deployment environment.

## 16. Future enhancements
SNMP metrics, network topology visualisation, role-specific notification rules, email notifications, multi-site management, predictive maintenance, and integration with existing network management systems.

## 17. Approval record
Supervisor decision: To be recorded.  
Feedback / required changes: To be recorded.  
Approval date: To be recorded.  
Student and supervisor signatures: Complete through the institution's official process.
