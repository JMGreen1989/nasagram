const db = require ('../config/connection');

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
                image = $/image/,
                description = $/description/
                WHERE space_id = $/space_id/
                RETURNING *
            `, space_id);
    },

    deleteImage(space_id){
        return db.none(`
            DELETE FROM space
            WHERE space_id = $1
        `, space_id)
    },
}
