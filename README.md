# NetPulse — Network Monitoring and Incident Management

> **Proposed MCA software project.** The network-specific specification is in this branch. The legacy EduBridge tutoring implementation remains in the repository and has not yet been replaced by NetPulse modules.

## Project proposal
NetPulse is a secure web-based network operations dashboard for an authorised computer laboratory or small office. It is designed to maintain an inventory of approved network devices and services, check availability, retain response-time history, show current health, manage incidents and deliver alerts.

## Technology foundation
React 18 + Vite, Node.js + Express, MongoDB + Mongoose, JWT/bcrypt, Docker Compose, GitHub Actions and automated tests.

## Project documents
- [NetPulse project synopsis](docs/NETWORK_MONITORING_PROJECT_SYNOPSIS.md)
- [Architecture and design](docs/NETWORK_MONITORING_ARCHITECTURE.md)
- [Product backlog](docs/NETWORK_MONITORING_PRODUCT_BACKLOG.md)
- [14-week syllabus-aligned plan](docs/NETWORK_MONITORING_SPRINT_PLAN.md)
- [Testing and validation plan](docs/NETWORK_MONITORING_TEST_PLAN.md)
- [Migration notes and current status](README_NETWORK_MONITORING.md)

## Safety
Only check assets and services that the operator owns or has explicit permission to monitor. The intended design excludes subnet sweeps, stealth probing, exploitation, credential collection, packet interception and denial-of-service activity.

## Current implementation status
The new branch currently contains project specifications and academic planning documents. The existing React screens and API still implement EduBridge peer tutoring; NetPulse monitoring features have not yet been implemented or tested. Do not submit planned features as completed work.
