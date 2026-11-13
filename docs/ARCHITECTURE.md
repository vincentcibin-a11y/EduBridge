# NetPulse Architecture Specification

The proposed network monitoring architecture, Mermaid component diagram, ERD, API catalogue, UI screen register, safe probe policy and deployment topology are documented in [NETWORK_MONITORING_ARCHITECTURE.md](NETWORK_MONITORING_ARCHITECTURE.md).

The application is planned as React + Vite frontend, Node.js + Express API, MongoDB persistence, authenticated asset/incident endpoints, and a bounded monitoring worker. The probe service must operate only on registered targets explicitly approved for monitoring.

**Implementation status:** Architecture proposal only. Update this document when the actual code and database schema are implemented and reviewed.
