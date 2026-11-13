# Product Backlog — NetPulse

This is a proposed backlog. Confirm priorities and acceptance criteria with the Project Guide/Product Owner and the network stakeholder. Set an item to Done only after implementation, test execution, and demo.

| ID | Epic | User story | Priority | Acceptance criteria |
|---|---|---|---|---|
| NP-01 | Identity | As an operator, I can sign in securely | Must | Passwords hashed; invalid login rejected; protected endpoints require valid JWT |
| NP-02 | Roles | As an administrator, I can control operator permissions | Must | Role checked server-side; unauthorised requests return 403 |
| NP-03 | Asset inventory | As an operator, I can register an approved device/service | Must | Name, target, type, location and criticality validated; duplicate rules documented |
| NP-04 | Asset management | As an operator, I can update or deactivate an asset | Must | Only authorised users can modify; deactivated assets are not scheduled |
| NP-05 | Safe target policy | As an administrator, I can restrict monitoring to approved targets | Must | No arbitrary scan input; probes only run for registered/approved targets; loopback/private ranges controlled by deployment policy |
| NP-06 | Manual probe | As an operator, I can run a check on an asset | Must | Bounded timeout; success/failure/timeout recorded with timestamp and duration |
| NP-07 | Scheduled probe | As an operator, I can enable periodic checks | Should | Interval has min/max bounds; no unbounded parallel jobs; failures isolated per asset |
| NP-08 | Monitoring history | As an operator, I can inspect past results | Must | Filter by asset/date/status; results are timestamped and paginated |
| NP-09 | Dashboard | As an operator, I can see network health at a glance | Must | Counts and availability summaries derived from stored results; empty state handled |
| NP-10 | Incidents | As an operator, I can create and update incidents | Must | Open/Acknowledged/Resolved transitions validated and audited |
| NP-11 | Alerts | As an operator, I receive status-change alerts | Should | Down/recovered transition creates one deduplicated alert |
| NP-12 | Reports | As an operator, I can export a monitoring report | Could | CSV export is filtered, escaped, and excludes secrets |
| NP-13 | Audit | As an administrator, I can review significant actions | Should | Asset, incident and configuration changes have actor/time records |
| NP-14 | Verification | As a maintainer, I can run repeatable automated checks | Must | Unit/API tests and frontend production build are in CI |
| NP-15 | Deployment | As an evaluator, I can run the system locally | Must | Documented Docker Compose start-up and health verification |
| NP-16 | Documentation | As an evaluator, I can inspect project artefacts | Must | Synopsis, architecture, backlog, sprint log, design, tests and deployment guide maintained |

## Definition of Done
Acceptance criteria met; code reviewed; tests executed and results recorded; security and target-authorisation checks verified; documentation updated; commit pushed; sprint demo completed; Product Owner feedback captured.

## Refinement log
| Date | Stakeholder role | Requirement / feedback | Decision and IDs | Owner / due |
|---|---|---|---|---|
| To be recorded | To be recorded | To be recorded | To be recorded | To be recorded |
