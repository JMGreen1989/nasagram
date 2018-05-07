
const db = require ('../config/connection');


function getAllUserImgs() {
  return db.many(`
    SELECT * FROM user
    `);

}


function getOneUserImg(id) {
  return db.many(`
  SELECT * FROM space
   WHERE user_id = $1`, user_id
   );
}


function makeUserImg(user){
  return db.many(`
  INSERT INTO space
  (user_id, username, password)
  VALUES ($/space_id/, $/username/, $/password/)
  RETURNING *`, user
    );
}


function updateUserImgs(id) {
  return db.many(`
  UPDATE user
  SET user_id = $/user_id/,
  username = $/username/, password = $/password/
  WHERE user_id = $/user_id/
  RETURNING *`, user)

}

function deleteUserImgs(id){
  return db.many(`
  DELETE FROM user
  WHERE user_id = $1
    `)
}

module.exports = {
  getAllUserImgs,
  getOneUserImg,
  makeUserImg,
  updateUserImgs,
  deleteUserImgs
}

