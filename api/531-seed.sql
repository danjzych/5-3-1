INSERT INTO users (username, password, email, is_admin)
VALUES ('danielz',
        'ethetyjrjrsyj',
        'danielz@email.com',
        TRUE),
        ('jimwendler',
        'ethetyjrjrsyj',
        'jim@531.com',
        FALSE);

INSERT INTO exercises (name)
VALUES ('Back Squat'), ('Deadlift'), ('Overhead Press'), ('Bench Press'), ('Dips');

INSERT INTO training_blocks (username)
VALUES ('danielz');

INSERT INTO training_maxes (weight_lb, exercise_id, training_block_id)
VALUES (260, 1, 1), (373.5, 2, 1), (150, 3, 1), (25, 5, 1);