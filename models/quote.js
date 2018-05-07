const db = require('../config/connection');

function getAll() {
  return db.many(`
    SELECT * FROM quotes
    `
  );
}

function getOne(id) {
  return db.one(`
    SELECT * FROM quotes
    WHERE id = $1
    `, id
  );
}

function create(quote) {
  return db.one(`
    INSERT INTO quotes (content, author, genre_type)
    VALUES ($/content/, $/author/, $/genre_type/)
    RETURNING *
    `, quote
  );
}

function update(quote) {
  return db.one(`
    UPDATE quotes
    SET content = $/content/, author = $/author/, genre_type = $/genre_type/
    WHERE id = $/id/
    RETURNING *
    `, quote
  );
}

function destroy(id) {
  return db.none(`
    DELETE FROM quotes WHERE id = $1
    `, id
  );
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
};
