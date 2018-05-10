const db    = require('../models/model');
const tokenService = require('../Services/tokenService');

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


    addUser(req, res, next) {
      db.handleAddUser(req.body)
      .then(data => {
        res.locals.user = data.user;
        next();
      })
      .catch(err => {
        next(err);
      });
    },

    getImage(req, res, next) {
      debugger;
        db.findOne(req.params.space_id)
            .then(data => {
                res.locals.single = data;
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
        .then(data => {
            res.locals.newItem = data
            next();
        })
        .catch(err => next(err));
    },

    destroyImage(req, res, next) {
        db.deleteImage(req.params.space_id)
        .then(() => next())
        .catch(err => next(err));
    },

    // AUTH STUFF

    register(req, res) {
        console.log('inside register', req.body, res.locals)
        db.handleAddUser(req.body)
            .then(data => tokenService.makeToken({
                user_id: data.user_id,
                username: data.username
            }))
            .then(token => {
            console.log('this is the token', token)
                res.json({
                        token
                    })
                })
            .catch(err => res.status(401).json({
                message: 'Username taken'
            }))
    },

    receiveToken(req, res, next) {
        if (req.headers.authorization) {
            req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
        }
        next();
    },

    restrict(req, res, next) {
        tokenService.verify(req.authToken)
            .then(data => {
        res.locals.user = data;
            next();
        })
        .catch(err => res.status(401).json({
            status: 'Error',
            message: 'Invalid credentials'
        }))
    },

    login(req, res, next) {
        console.log('im in the controller in login')
        db.login(req.body)
        console.log(req.body, ' this is the req.body')
            .then(data => tokenService.makeToken({
                id: data.id,
                username: data.username
            }))
            .then(token => {
                res.json({
                    token
                })
            })
            .catch(err => res.status(401).json({
                status: 'Error',
                message: 'Invalid credentails'
            }))
    },
}
