const db           = require('../models/model');
const dbUsers      = require('../models/userModel');
const tokenService = require('../Services/tokenService');
const bcrypt       = require('bcrypt');
const saltRounds   = 10;

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


    async addUser(req, res, next) {
      req.body.hasword = await bcrypt.hash(req.body.password, 5)
      dbUsers.handleAddUser(req.body)
      .then(data => {
        next();
      })
      .catch(err => {
        next(err);
      });
    },

    getImage(req, res, next) {
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
      req.body.space_id = req.params.space_id
        db.update(req.body)
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
    async register(req, res, next) {
        req.body.hashword = await bcrypt.hash(req.body.password, 5)
        dbUsers.handleAddUser(req.body)
            .then((user) => {
                next();
            })
            .catch(err => {
                console.log('theres an err, sorry', err)
                next(err)
            })
    },

    // this is setting req.authToken
    receiveToken(req, res, next) {
        if (!req.headers.authorization) {
            return next();
        }
        const unverifiedToken = req.headers.authorization.replace(/^Bearer\s/, '');
        return tokenService.verify(unverifiedToken, {iss: 'nasagram'}, (err, data) => {
            req.tokenData=data
            next()
        })
    },

    async getUserFromToken(req, res, next){
        if(!req.tokenData){
            return next()
        }
        try {
            // this is the data that we need
            // this holds:
            //
            // SELECT * FROM users
            // WHERE username = 'wtf'
            //
            // user: { user_id: 46,
            // username: 'wtf',
            // password: '$2b$05$lg/Xf9Q4uxXyE09Y4O2I7uyJADmkyNNe.vEH/fZ30YWupzdH.yPr6' }
            
            req.user = await dbUsers.findByUsername(req.tokenData.user.username)
            return next()
        }
        catch(error) {
            console.log(error)
            return next()
        }
    },

    // check for that token in recieveToken
    isLoggedin(req, res, next) {
        tokenService.verify(req.authToken)
        .then(data => {
            console.log('ive been verified: ', data)
            res.send(data)
            next();
        })
        .catch(err => res.status(401).json({
            status: 'error',
            message: 'invalid creds'
        }))
    },


    // handle logging in
     async authenticate(req, res, next) {
           try {
               const { username, password } = req.body;
               const user = await dbUsers.findByUsername(username);
               const valid = bcrypt.compareSync(password, user.password);
               console.log('user:', user)
               console.log('valid:', valid)
               if(!valid || !user) {
                   throw { message : 'wrong password'}
               }

               delete user.user_id
               delete user.password

               res.locals.token = tokenService.makeToken({ user });
               next()
           } catch (err) {
               console.log(err, ' something broke')
               next(err);
           }
   },
}
