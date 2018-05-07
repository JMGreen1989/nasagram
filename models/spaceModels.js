
const db = require ('../config/connection');


function getAllSpaceImgs() {
  return db.many(`
    SELECT * FROM space
    `);

}


function getOneSpaceImg(id) {
  return db.many(`
  SELECT * FROM space
   WHERE space_id = $1`, space_id
   );
}


function makeSpaceImg(space){
  return db.many(`
  INSERT INTO space
    (user_id, description, image)
    VALUES ($/space_id/, $/description/, $/image/)
    RETURNING *`, space
    );
}


function updateSpaceImgs(id) {
  return db.many(`
    UPDATE space
    SET user_id = $/space_id/,
    description = $/description/, image = $/image/
    WHERE space_id = $/space_id/
    RETURNING *`, space)

}

function deleteSpaceImgs(id){
  return db.many(`
  DELETE FROM space
  WHERE space_id = $1
    `)
}

module.exports = {
  getAllSpaceImgs,
  getOneSpaceImg,
  makeSpaceImg,
  updateSpaceImgs,
  deleteSpaceImgs
}

