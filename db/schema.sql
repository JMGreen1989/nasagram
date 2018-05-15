

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS space CASCADE;
DROP TABLE IF EXISTS reference CASCADE;

CREATE TABLE users (
 user_id SERIAL PRIMARY KEY,
 username VARCHAR(28),
 password VARCHAR(28)
);

CREATE TABLE space (
 space_id SERIAL PRIMARY KEY,
 image VARCHAR(255),
 description VARCHAR(255)
);

CREATE TABLE reference (
 user_id INT,
 space_id INT
)
