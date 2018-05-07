\c quotes_db

DELETE FROM quotes;

INSERT INTO quotes (content, author, genre_type)
VALUES
  ('Sometimes you win, sometimes you learn.', 'Unknown', 'motivational'),
  ('Do or do not, there is no try.', 'Yoda', 'motivational'),
  ('A simple "Hello" could lead to a million things.', 'Unknown', 'motivational'),
  ('The expert at anything was once a beginner.', 'Helen Hayes', 'education');
