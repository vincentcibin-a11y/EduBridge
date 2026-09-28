# EduBridge Screenshot Evidence

Store screenshots captured from the running EduBridge application in this directory. Use the filenames below so the evidence can be referenced consistently in the [Manual Acceptance Test Evidence](../Manual_Acceptance_Test_Evidence.md) record.

## Screenshot checklist

| Filename | What to capture | Status |
|---|---|---|
| `01-homepage.png` | Dashboard after login | Capture/save the screenshot from the current running app |
| `02-registration-login.png` | Registration and successful login with test accounts | Not recorded |
| `03-profile.png` | Updated profile still present after refresh | Not recorded |
| `04-doubt.png` | Newly created doubt in the list/detail page | Not recorded |
| `05-answer.png` | Answer displayed under the doubt | Not recorded |
| `06-tutor-search.png` | Search results showing the test tutor | Not recorded |
| `07-booking-pending.png` | New booking request in Pending state | Not recorded |
| `08-booking-status.png` | Accepted or rejected booking | Not recorded |
| `09-session-completed.png` | Completed booking/session | Not recorded |
| `10-review-rating.png` | Submitted review and updated rating summary | Not recorded |
| `11-notifications.png` | Notification list and read/unread state | Not recorded |
| `12-docker.png` | Output of `docker compose ps` showing running services | Not recorded |
| `13-health.png` | Successful frontend/backend health check | Not recorded |

A screenshot can support more than one test. Update this table only after the corresponding screenshot has actually been captured and saved in this directory.

## How to add screenshots

1. Run the application and complete the relevant action.
2. Capture the screen with `Win + Shift + S`.
3. Save the file in this directory using the exact filename in the table.
4. Commit and push the image file to GitHub.
5. Reference the filename in the manual acceptance test record.

Example PowerShell commands, run from the repository root:

```powershell
git add docs/evidence/01-homepage.png
git commit -m "Add EduBridge dashboard screenshot evidence"
git push origin main
```

## Evidence integrity and privacy

- Only use screenshots captured from the actual application/version being submitted.
- Do not mark a test as Pass until it has been run and the expected behaviour observed.
- Do not include passwords, authentication tokens, secret environment variables, or private information.
- If a test fails, record the observed behaviour and create a GitHub issue if appropriate.
- Embedded previews or links are not a substitute for committing the original screenshot files to this directory.

## Related documents

- [Manual Acceptance Test Evidence](../Manual_Acceptance_Test_Evidence.md)
- [Final Submission Checklist](../Final_Submission_Checklist.md)
- [Project Documentation](../EduBridge_Project_Documentation.md)
- [Scrum Book](../EduBridge_Scrum_Book.md)
