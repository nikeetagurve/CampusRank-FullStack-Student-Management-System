# API reference

Base path: `/api/v1`

## Public
- `GET /health`
- `POST /auth/register` — `{ "fullName", "email", "password", "role", "department", "yearOfStudy" }`
- `POST /auth/login` — `{ "email", "password" }`

## Authenticated
- `GET /auth/me` — current profile
- `GET /leaderboard?page=0&size=10&sort=totalPoints,desc`
- `GET /students/me` — student profile and rank
- `GET /students/{id}` — teacher-only student details
- `GET /students/{id}/transactions?page=0&size=10` — teacher or own student
- `POST /students/{id}/points` — teacher-only `{ "points": 10, "reason": "Excellent project work" }`

## Response conventions
- `200` successful read/update
- `201` created
- `400` invalid input
- `401` missing/invalid authentication
- `403` insufficient role
- `404` resource not found

All errors use `{ "timestamp", "status", "error", "message", "path" }`.
