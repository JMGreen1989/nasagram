const db = require ('../config/connection');

module.exports = {
    handleAddUser(body) {
        return db.one(`
                INSERT INTO users (
                username, password
                ) VALUES (
                $/username/, $/hashword/
                )
                RETURNING *
        `, body);
    },

    findByUsername(username) {
        return db.one(`
        SELECT * FROM users
        WHERE username = $1
        `, username);
    }
}
