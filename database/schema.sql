CREATE TABLE IF NOT EXISTS app_users (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('STUDENT', 'TEACHER')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES app_users(id) ON DELETE CASCADE,
    department VARCHAR(100) NOT NULL DEFAULT 'Computer Science',
    year_of_study INTEGER NOT NULL DEFAULT 1,
    total_points INTEGER NOT NULL DEFAULT 0 CHECK (total_points >= 0)
);

CREATE TABLE IF NOT EXISTS point_transactions (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    teacher_id BIGINT NOT NULL REFERENCES app_users(id),
    points INTEGER NOT NULL CHECK (points BETWEEN 1 AND 1000),
    reason VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_student_points ON student_profiles(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_point_transactions_student ON point_transactions(student_id);
