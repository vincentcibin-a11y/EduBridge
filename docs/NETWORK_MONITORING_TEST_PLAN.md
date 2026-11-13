# NetPulse — Testing and Validation Plan

Do not mark results as Pass until the test has been executed in the stated environment.

| Test ID | Scenario | Expected result | Actual result / status |
|---|---|---|---|
| NPT-01 | Register and login with valid credentials | Account created; secure token returned | To be executed |
| NPT-02 | Access protected API without token | 401 response | To be executed |
| NPT-03 | Use a role not permitted to edit assets | 403 response | To be executed |
| NPT-04 | Register valid authorised HTTP(S) endpoint | Asset persisted | To be executed |
| NPT-05 | Submit malformed hostname/IP or invalid interval | 400 validation response | To be executed |
| NPT-06 | Attempt to probe a target not in inventory | Request rejected; no probe executed | To be executed |
| NPT-07 | Probe a test web service returning 200 | Reachable result and duration recorded | To be executed |
| NPT-08 | Probe a test service returning 503 | HTTP failure status recorded accurately | To be executed |
| NPT-09 | Probe a controlled endpoint that does not respond | Timeout bounded by configured limit | To be executed |
| NPT-10 | Resolve a deliberately invalid test hostname | DNS failure recorded without crashing worker | To be executed |
| NPT-11 | Run scheduler with minimum allowed interval | Jobs run within configured limits | To be executed |
| NPT-12 | Disable an asset during scheduling | No further scheduled probes for asset | To be executed |
| NPT-13 | Down-state transition occurs | Single deduplicated alert/incident event | To be executed |
| NPT-14 | Recovery transition occurs | Recovery event recorded and alert created | To be executed |
| NPT-15 | Invalid incident state transition | Rejected with validation/conflict response | To be executed |
| NPT-16 | Export filtered CSV with formula-like text | CSV safely escaped; filters applied | To be executed |
| NPT-17 | Frontend production build | Build succeeds | To be executed |
| NPT-18 | Docker Compose deployment and health endpoint | Services start; API health succeeds | To be executed |

## Evidence record template
- Test ID:
- Date/time:
- Commit / version:
- Environment (OS, Node version, MongoDB version):
- Test data / authorised target:
- Steps:
- Expected:
- Actual:
- Pass / Fail / Blocked:
- Defect ID:
- Screenshot or log path:
- Retest outcome:
