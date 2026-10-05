# Contributing to EduBridge

EduBridge is an MCA academic project. Contributions and suggestions are welcome when they improve the learning platform without weakening its security or academic integrity.

## Development

1. Fork or branch from `main`.
2. Run the project with Docker Compose or the documented local setup.
3. Make a focused change.
4. Run backend tests:
   ```bash
   cd backend
   npm test
   ```
5. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
6. Validate Docker Compose:
   ```bash
   docker compose config --quiet
   ```
7. Update documentation when behaviour or setup changes.

## Pull requests

Keep pull requests small and explain:

- what changed
- why it changed
- how it was tested
- any known limitations

Never commit `.env` files, passwords, JWT secrets, tokens or private test data.

## Commit style

Prefer clear imperative messages such as:

- `feat: add tutor availability filtering`
- `fix: prevent duplicate session reviews`
- `test: cover booking authorization`
- `docs: update Docker setup`
