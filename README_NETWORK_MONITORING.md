# NetPulse — Network Monitoring and Incident Management

**Proposed MCA project based on the existing EduBridge full-stack repository.**

> Important: this branch establishes the project direction and academic artefacts. It is not a claim that the network monitoring modules are already implemented. The existing application still contains EduBridge tutoring features until those features are replaced or isolated in subsequent development sprints.

## Project objective
Build a secure dashboard for an authorised lab or small-office operator to inventory approved devices and services, check availability, review monitoring history, manage incidents and receive alerts.

## Existing foundation retained
- React 18 + Vite frontend
- Node.js + Express REST API
- MongoDB + Mongoose
- JWT authentication and bcrypt
- Docker Compose
- GitHub Actions CI and existing test setup

## Planned functionality
1. Operator accounts and roles.
2. Registered asset inventory.
3. Safe HTTP(S) availability checks (and optional controlled ICMP).
4. Bounded scheduled monitoring and check history.
5. Up/down status summary and response-time graphs.
6. Incident lifecycle and deduplicated alerts.
7. Filtered CSV reporting and audit events.

## Academic documents
- [Project synopsis](docs/NETWORK_MONITORING_PROJECT_SYNOPSIS.md)
- [Architecture](docs/NETWORK_MONITORING_ARCHITECTURE.md)
- [Product backlog](docs/NETWORK_MONITORING_PRODUCT_BACKLOG.md)
- [14-week plan](docs/NETWORK_MONITORING_SPRINT_PLAN.md)
- [Test plan](docs/NETWORK_MONITORING_TEST_PLAN.md)

## Development
Use two-week Scrum sprints, progress meetings approximately every three days, and a demo at every sprint review. Get the synopsis and target-authorisation policy approved by the Project Guide before executing monitoring against real infrastructure. Record stakeholder interviews and test results truthfully in the Scrum Book.

## Safety boundary
Only monitor devices/services that you own or have explicit permission to assess. No subnet scanning, stealth probing, exploitation, credential harvesting, packet interception, or denial-of-service testing is part of this project.

## Current status
Project proposal and documentation branch created. Network-specific implementation, tests, UI replacement, and deployment validation remain sprint tasks. Do not represent planned features as completed.
