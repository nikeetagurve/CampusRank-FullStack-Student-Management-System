# CampusRank — Student Performance & Management System

A full-stack student management application built for the Honors Full Stack-II assignment.

## Stack
- Mobile: React Native + Expo, React Navigation, Redux Toolkit, Expo SecureStore
- API: Java 17+, Spring Boot 3.4.5, Spring Security, JWT, Spring Data JPA, Bean Validation
- Database: PostgreSQL

## Features
- Student and teacher registration/login with JWT authentication
- Role-protected teacher and student experiences
- Student dashboard and paginated leaderboard
- Teacher point awards with transaction history
- Server-side sorting and pagination
- Light/dark theme
- Persistent login token on device
- Centralized API error responses and request validation

## Repository layout
```text
CampusRank/
├── frontend/       Expo React Native app
├── backend/        Spring Boot REST API
├── database/       PostgreSQL schema and seed data
└── docs/           API notes and demo checklist
```

## 1. Prerequisites
- Node.js LTS and npm
- Java 17+
- Maven 3.9+
- PostgreSQL 14+
- Expo Go on a physical phone OR Android Studio/iOS Simulator

## 2. Database setup
Create a PostgreSQL database and user, or use your existing local PostgreSQL installation.

```sql
CREATE DATABASE campusrank;
CREATE USER campusrank_user WITH PASSWORD 'change_me';
GRANT ALL PRIVILEGES ON DATABASE campusrank TO campusrank_user;
```

Connect to `campusrank` and run `database/schema.sql` if you want to inspect/create the schema manually. Hibernate is configured with `ddl-auto=update` for local development.

## 3. Run backend
```bash
cd backend
cp .env.example .env
```
Set `DB_USERNAME`, `DB_PASSWORD`, and a long random `JWT_SECRET` in your environment (or edit `src/main/resources/application.yml` for a local-only demo).

```bash
mvn spring-boot:run
```
API base URL: `http://localhost:8080/api/v1`

Health check: `GET http://localhost:8080/api/v1/health`

**Physical phone note:** `localhost` on a phone means the phone itself. Set `EXPO_PUBLIC_API_URL` to your computer's LAN IP, for example `http://192.168.1.5:8080/api/v1`, and ensure both devices share the same Wi-Fi. For an Android emulator use `http://10.0.2.2:8080/api/v1`.

## 4. Run frontend
```bash
cd frontend
npm install
cp .env.example .env
```
Set `EXPO_PUBLIC_API_URL` to the reachable backend URL, then:
```bash
npx expo start
```
Scan the QR code with Expo Go or launch an emulator.

## 5. Demo flow
1. Register a teacher account (choose `TEACHER`).
2. Register two or more student accounts (choose `STUDENT`).
3. Log in as teacher and award points to a student.
4. Open the leaderboard and confirm ranks reorder.
5. Log in as a student and confirm the leaderboard is read-only.
6. Toggle the theme and restart the app to verify theme/session behavior.

## Security and demo notes
- Passwords are BCrypt-hashed; passwords are never returned by the API.
- JWT is required for protected endpoints; teacher-only point awards are enforced on the backend, not just hidden in the UI.
- For a classroom demo, open registration allows role selection as required by the assignment. In a production deployment, teacher role assignment must be restricted to an administrator/invitation.
- Replace the example JWT secret and database credentials before any deployment. Do not commit real secrets.
- CORS is permissive for local development; tighten allowed origins for production.

## GitHub push
From this folder:
```bash
git init
git add .
git commit -m "Initial CampusRank full-stack implementation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/campusrank.git
git push -u origin main
```

## Known scope
This is a working assignment starter with the core end-to-end flows. Before submission, run the checklist in `docs/DEMO_CHECKLIST.md`, verify your own machine's network/database settings, and capture screenshots from the running app.
