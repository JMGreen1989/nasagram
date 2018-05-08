const db = require ('../config/connection');


function getAllSpaceImgs() {
  return db.many(`
    SELECT * FROM space
    `);
}

function getAllUsers() {
  return db.many(`
    SELECT * FROM users
    `);
}

function createRef(user_id, space_id){
    return db.one(`
        INSERT INTO reference (user_id, space_id)
            VALUES (
                ${user_id},
                ${space_id}
            )
        RETURNING *
    `);
}

function joingTables(id){
    return db.many(`
        SELECT *
          FROM reference
          JOIN users ON (reference.user_id = users.user_id)
          JOIN space ON (reference.space_id = space.space_id)
        WHERE reference.user_id = $1
    `, id);
}

function handleSubmit(image) {
    return db.one(`
            INSERT INTO space
            (image, description)
            VALUES ($/image/, $/description/)
            RETURNING *
        `, image);
}

module.exports = {
  getAllSpaceImgs,
  getAllUsers,
  createRef,
  handleSubmit,
  joingTables,
}
