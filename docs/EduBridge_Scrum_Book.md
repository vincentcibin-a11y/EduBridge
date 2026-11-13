# NetPulse Scrum Book
## MCA Software Project — FISAT

**Project:** NetPulse — Network Monitoring and Incident Management System  
**Student:** Cibin Vincent  
**Programme:** MCA  
**Student ID:** FIT25MCA-2028  
**Project Guide / Product Owner:** To be confirmed with department  
**Repository:** https://github.com/vincentcibin-a11y/EduBridge/tree/network-monitoring-project

> This is a new project record template for the NetPulse proposal. It intentionally does not reuse EduBridge's old tutoring sprint claims, test results, screenshots, guide feedback or completion checklists. Enter dated records only after the corresponding activity has actually occurred.

## Contents
1. Product Backlog
2. Database & UI Design
3. Testing & Validation
4. Details of Versions
5. Sprint / Scrum Meeting Records
6. Review and Submission Checklist

# 1. Product Backlog
Product vision: provide an authorised operator with a clear view of registered network assets, availability, response-time history, alerts and incident status.

Primary backlog: see [NETWORK_MONITORING_PRODUCT_BACKLOG.md](NETWORK_MONITORING_PRODUCT_BACKLOG.md). Keep acceptance criteria and priority updated after stakeholder discussions. Maintain actual status and evidence links.

## Product Owner and stakeholder discovery
| Date | Stakeholder role (with consent) | Questions / requirement | Decision / backlog ID | Follow-up |
|---|---|---|---|---|
| To be recorded | To be recorded | To be recorded | To be recorded | To be recorded |

# 2. Database & UI Design

## Proposed database entities
| Entity | Main data | Relationship |
|---|---|---|
| User | name, email, passwordHash, role | owns assets; assigned incidents; receives alerts |
| Asset | name, target, type, location, criticality, interval, enabled | has check results and incidents |
| CheckResult | asset, checkedAt, status, responseTimeMs, checkType, message | belongs to one asset |
| Incident | asset, title, severity, status, assignee, timestamps, resolutionNote | belongs to asset |
| Alert | asset, incident, type, message, read, createdAt | delivered to user |

## UI screens to design and validate
1. Login and operator role.
2. Network overview with Up / Down / Unknown assets and recent incidents.
3. Asset inventory with approved target registration and configuration.
4. Asset detail with response-time trend and check history.
5. Incident board with severity and Open / Acknowledged / Resolved state.
6. Alert inbox and report export.

Architecture and ERD: [NETWORK_MONITORING_ARCHITECTURE.md](NETWORK_MONITORING_ARCHITECTURE.md).

# 3. Testing & Validation

Test plan: [NETWORK_MONITORING_TEST_PLAN.md](NETWORK_MONITORING_TEST_PLAN.md).

| Test ID | Date | Environment / authorised test target | Expected result | Actual result | Pass / Fail / Blocked | Defect / evidence |
|---|---|---|---|---|---|---|
| To be recorded | To be recorded | To be recorded | To be recorded | To be recorded | To be recorded | To be recorded |

Test only assets and endpoints approved by the institution or owner. Do not mark a test as passed without execution.

# 4. Details of Versions

| Date | Version / tag | Commit SHA | Files / feature changed | Tests and evidence | Guide review |
|---|---|---|---|---|---|
| 13-11-2026 | NetPulse proposal baseline | 708e46d2f0edc7ce6f0b865566a793f1ed650505 (README_NETWORK_MONITORING.md) | Initial project proposal documents added on network-monitoring-project branch | Documentation only; application features not yet implemented | To be recorded |

Update this table with actual commit hashes and test evidence after each sprint. The current baseline is a documentation proposal, not a deployed monitoring application.

# 5. Sprint and Scrum Meeting Records

Use two-week sprints. Conduct short progress meetings approximately every three days where practical (under 15 minutes). Hold a review and working demo with the Product Owner at every sprint end (under 30 minutes).

See [NETWORK_MONITORING_SPRINT_PLAN.md](NETWORK_MONITORING_SPRINT_PLAN.md) for the proposed 14-week schedule.

## Sprint record template
### Sprint [number] — [actual start date] to [actual end date]
- Sprint goal:
- Backlog IDs and acceptance criteria:
- Tasks and owner:
- Demonstrable increment:
- Test IDs executed and results:
- Demo date and attendees:
- Product Owner feedback:
- Decisions / backlog changes:
- Blockers and resolution:
- Retrospective and improvement action:

## Progress check-in template
| Date/time | Completed | Next work | Blocker | Scrum Master guidance | Action / due date |
|---|---|---|---|---|---|
| To be recorded | To be recorded | To be recorded | To be recorded | To be recorded | To be recorded |

# 6. Review and Submission Checklist
- [ ] Topic and synopsis approved by Project Guide.
- [ ] Stakeholder requirements captured with actual dates.
- [ ] Product backlog refined and prioritised.
- [ ] Database and UI designs match the implemented application.
- [ ] Two-week sprint reviews and demos recorded.
- [ ] Automated and manual test results are genuine and reproducible.
- [ ] Git commit history and release tag verified.
- [ ] Docker deployment and health checks executed.
- [ ] Screenshots show the actual NetPulse application.
- [ ] Final report and presentation reviewed by the department.
- [ ] External evaluation build and demonstration prepared.

