CREATE TABLE users (
    username VARCHAR(30) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
        CHECK (position('a' in email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    join_date DATE NOT NULL DEFAULT NOW(),
)

CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
)

CREATE TABLE training_maxes (
    training_max_id PRIMARY KEY,
    weight INT NOT NULL,
    exercise_id INT NOT NULL REFERENCES exercises,
    username VARCHAR(30) NOT NULL REFERENCES users,
)

CREATE TABLE cycles (
    id SERIAL PRIMARY KEY,
)