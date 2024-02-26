INSERT INTO users (username, password, email, is_admin)
VALUES ('danielz',
        '$2a$12$rycafGjHBe9JM1Vxy1U8xe0SKhBgMUfngxIpjSlCZHQ4U7I7TfAqe',
        'danielz@email.com',
        TRUE),
        ('jimwendler',
        '$2a$12$rycafGjHBe9JM1Vxy1U8xe0SKhBgMUfngxIpjSlCZHQ4U7I7TfAqe',
        'jim@531.com',
        FALSE);

INSERT INTO exercises (name)
VALUES ('Back Squat'), ('Deadlift'), ('Overhead Press'), ('Bench Press'), ('Dips');

INSERT INTO training_blocks (username)
VALUES ('danielz');

INSERT INTO training_maxes (weight_lb, exercise_id, training_block_id)
VALUES (260, 1, 1), (373.5, 2, 1), (150, 3, 1), (25, 5, 1);