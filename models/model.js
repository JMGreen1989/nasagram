const db         = require ('../config/connection');
const bcrypt     = require('bcrypt');
const saltRounds = 10;

module.exports = {
    createRef(user_id, space_id){
        return db.one(`
            INSERT INTO reference (user_id, space_id)
                VALUES (
                    ${user_id},
                    ${space_id}
                )
            RETURNING *
        `);
    },

    deleteRef(user_id, space_id){
        return db.none(`
            DELETE FROM reference
            WHERE space_id = $1 AND
            WHERE user_id = $2
        `, [space_id, user_id])
    },

    joingTables(id){
        return db.many(`
            SELECT *
              FROM reference
              JOIN users ON (reference.user_id = users.user_id)
              JOIN space ON (reference.space_id = space.space_id)
            WHERE reference.user_id = $1
        `, id);
    },

    handleAddUser(credentials) {
      console.log('this is credentials', credentials)
      bcrypt.hash(credentials.password, saltRounds)
      .then(hash => {
        credentials = {
          username: credentials.username,
          password: hash
        }
      })
      // console.log('hashed', newUser)
      return db.one(`
              INSERT INTO users (
              username, password
              ) VALUES (
              $/username/, $/password/
              )
               RETURNING user_id, username
        `, credentials);
    },

    findByUsername(username) {
        return db.one(`
        SELECT * FROM users
        WHERE username = $1
        `, username);
    },

    login(credentials) {
        return findByUsername(credentials.username)
            .then(user => (
        // compare the provided password with the password digest
        bcrypt.compare(credentials.password, user.password)
        // match is a boolean if hashing the provided password
        // matches the hashed password
        .then(match => {
            if (!match) throw new Error('Credentials do not match');
            delete user.password;
            return user;
            })
        ));
    },

    handleSubmit(image) {
        return db.one(`
                INSERT INTO space
                (image, description)
                VALUES ($/image/, $/description/)
                RETURNING *
            `, image);
    },

    findOne(space_id) {
        return db.one(`
            SELECT *
            FROM space
            WHERE space_id = $1
        `, space_id);
    },

    update(space_id) {
        return db.one(`
                UPDATE space
                SET
                description = $/description/,
                WHERE space_id = $/space_id/
                returning *
            `, space_id);
    },

    deleteImage(space_id){
        return db.none(`
            DELETE FROM space
            WHERE space_id = $1
        `, space_id)
    },
}
