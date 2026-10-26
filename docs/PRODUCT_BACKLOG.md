# Product Backlog — EduBridge (20MCA246)

This backlog is a working proposal. Priority and acceptance criteria must be confirmed with the Project Guide/Product Owner after requirements discussions. Move items to Done only when implemented, tested and demonstrated.

| ID | Epic / feature | User story | Priority | Acceptance criteria | Status / evidence |
|---|---|---|---|---|---|
| PB-01 | Account | As a student, I can register and sign in securely | Must | Valid fields accepted; invalid fields rejected; protected API requires authentication | Verify current code/tests |
| PB-02 | Profile | As a student, I can maintain my subjects, skills and availability | Must | Valid edits persist and only permitted fields are changed | Verify and attach test |
| PB-03 | Doubts | As a learner, I can post and find academic questions | Must | Questions validate required content and appear in list/search | Verify and attach test |
| PB-04 | Answers | As a peer, I can post an answer to an academic doubt | Must | Valid answer saved with author; invalid request rejected | Verify and attach test |
| PB-05 | Tutor discovery | As a learner, I can find peers by subject and skill | Must | Matching profiles shown and query validation is safe | Verify and attach test |
| PB-06 | Booking | As a learner, I can request a tutoring session | Must | Future date, mode and tutor are validated; pending status assigned | Verify and attach test |
| PB-07 | Booking lifecycle | As a tutor, I can accept or reject requests | Must | Only authorized tutor can transition an eligible pending request | Verify and attach test |
| PB-08 | Completion | As a tutor, I can mark an accepted session complete | Must | Valid state transition; duplicate or unauthorized completion denied | Verify and attach test |
| PB-09 | Notifications | As a user, I can see and mark event notices read | Should | Only own notifications are affected | Verify and attach test |
| PB-10 | Reviews | As a learner, I can rate a completed session | Must | Completed eligible booking, rating range and duplicate controls validated | Verify and attach test |
| PB-11 | Testing | As a maintainer, I can repeat API tests and production build | Must | Test/build commands documented; real outputs archived | Record CI and local run |
| PB-12 | Documentation | As an evaluator, I can understand design and operation | Must | Synopsis, architecture, data/UI design, Scrum Book, test log and deployment steps maintained | Review completeness |
| PB-13 | Deployment | As an evaluator, I can run the application repeatably | Should | Docker/local setup works; health check verified; secrets kept out of source | Record actual demo |
| PB-14 | Enhancements | As a student, I can chat/share learning resources | Could | Defer unless approved and core acceptance criteria are complete | Future scope |

## Backlog refinement record

| Date | Attendees / stakeholder roles | Feedback or requirement | Decision / changed item IDs | Owner and due date |
|---|---|---|---|---|
| TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED | TO BE RECORDED |
