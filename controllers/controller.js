const db    = require('../models/model');

module.exports = {
    createReference(req, res, next) {
        db.createRef(1, res.locals.space_id)
          .then(data => {
            res.locals.refTable = data;
            next();
          })
          .catch(err => {
            next(err);
          });
    },

    destroyReference(req, res, next) {
        db.deleteRef(1, req.params.space_id)
            .then(() => next())
            .catch(err => next(err));
    },

    addImage(req, res, next) {
        db.handleSubmit(req.body)
          .then(data => {
            res.locals.space_id = data.space_id;
            next();
          })
          .catch(err => {
            next(err);
          });
    },

    getImage(req, res, next) {
        db.findOne(req.params.space_id)
            .then(data => {
                // res.locals.current = data
                res.send(data)
                next();
            })
            .catch(err => {
                next(err);
            });
    },

    getCustomFeed(req, res, next){
        db.joingTables(1)
        .then(data => {
            res.locals.customFeed = data.map((elem, i ) => (elem))
            next();
        })
        .catch(err => {
            next(err);
        });
    },

    update(req, res, next) {
        db.update(req.params.space_id)
        .then(() => next())
        .catch(err => next(err));
    },

    destroyImage(req, res, next) {
        db.deleteImage(req.params.space_id)
        .then(() => next())
        .catch(err => next(err));
    },
}
