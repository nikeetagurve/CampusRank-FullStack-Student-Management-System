# Live demo checklist

- [ ] PostgreSQL service is running and `campusrank` database exists.
- [ ] Backend starts successfully; `/api/v1/health` returns `UP`.
- [ ] Expo app starts and can reach the backend from the chosen simulator/device.
- [ ] Register one teacher and at least two students.
- [ ] Login as teacher; verify teacher dashboard and award points.
- [ ] Verify success feedback and leaderboard reorders.
- [ ] Login as student; verify own rank/score and no award controls.
- [ ] Try teacher-only endpoint using a student token; expect HTTP 403.
- [ ] Verify pagination and sort controls.
- [ ] Toggle light/dark theme.
- [ ] Restart app; verify authenticated session restores.
- [ ] Capture screenshots and add them to `screenshots/`.
