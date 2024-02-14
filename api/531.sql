\echo 'Delete and recreate _531 database?'
\prompt 'Return for yes or ctrl-C to cancel > ' foo

DROP DATABASE _531;
CREATE DATABASE _531;
\connect _531;

\echo 'Building schema...'
\i 531-schema.sql

\echo 'Seeding data...'
\i 531-seed.sql


\echo 'Delete and recreate _531_test database?'
\prompt 'Return for yes or ctrl-C to cancel > ' foo

DROP DATABASE _531_test;
CREATE DATABASE _531_test;
\connect _531_test;

\echo 'Building schema...'
\i 531-schema.sql

\echo 'Seeding data...'
\i 531-seed.sql