\echo 'Delete and recreate _531 database?'
\echo '\n'
\prompt 'Return for yes or ctrl-C to cancel > ' foo

DROP DATABASE _531;
CREATE DATABASE _531;
\connect _531;

\echo '\n'
\echo 'Building schema...'
\i 531-schema.sql

\echo '\n'
\echo 'Seeding data...'
\i 531-seed.sql

\echo '\n'
\echo 'Done creating _531.'

\echo '\n'
\echo 'Delete and recreate _531_test database?'
\echo '\n'
\prompt 'Return for yes or ctrl-C to cancel > ' foo

DROP DATABASE _531_test;
CREATE DATABASE _531_test;
\connect _531_test;

\echo '\n'
\echo 'Building schema...'
\i 531-schema.sql

\echo '\n'
\echo 'Seeding data...'
\i 531-seed.sql

\echo '\n'
\echo 'Done creating _531_test.'