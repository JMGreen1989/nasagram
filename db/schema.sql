\c quotes_db

DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author VARCHAR(255),
  genre_type VARCHAR(255)
);
