# Security Policy

## Supported version

The current `main` branch is the supported project version.

## Reporting a vulnerability

Please do not publish security vulnerabilities as public GitHub issues.

For an academic project, report suspected vulnerabilities privately to the repository owner through GitHub. Include:

- affected file or endpoint
- reproducible steps
- expected behaviour
- observed behaviour
- security impact
- a suggested mitigation, if known

Do not include real passwords, access tokens, personal data or production secrets in a report.

## Security practices

EduBridge currently uses:

- bcrypt password hashing
- JWT authentication
- protected resource ownership checks
- request-size limits
- restricted CORS
- security response headers
- production JWT secret validation
- automated API and integration tests

This project is an academic MVP and should not be treated as production-ready without additional operational controls such as rate limiting, secret management, HTTPS, monitoring and deployment hardening.
