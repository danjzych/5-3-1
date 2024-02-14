CREATE TABLE users (
    username VARCHAR(30) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
        CHECK (position('@' in email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    join_date DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE training_blocks (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL REFERENCES users ON DELETE CASCADE,
    start_date DATE NOT NULL DEFAULT NOW(),
    end_date DATE,

    UNIQUE(username, start_date)
);

CREATE TABLE training_maxes (
    id SERIAL PRIMARY KEY,
    weight_lb INT NOT NULL,
    exercise_id INT NOT NULL REFERENCES exercises,
    training_block_id INT NOT NULL REFERENCES training_blocks ON DELETE CASCADE
);

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    training_block_id INT NOT NULL REFERENCES training_blocks ON DELETE CASCADE,
    week INT NOT NULL
        CHECK(week < 5),
    day INT NOT NULL
        CHECK(day < 7),
    date DATE default NOW(),

    UNIQUE(training_block_id, week, day, date)
);

CREATE TABLE sets (
    training_block_id INT NOT NULL REFERENCES training_blocks ON DELETE CASCADE,
    exercise_id INT NOT NULL REFERENCES exercises,
    set INT NOT NULL,
    weight INT NOT NULL,

    PRIMARY KEY(training_block_id, exercise_id, set)
);