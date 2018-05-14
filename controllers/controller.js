const db           = require('../models/model');
const dbUsers      = require('../models/userModel');
const tokenService = require('../Services/tokenService');
const bcrypt       = require('bcrypt');
const saltRounds   = 10;

module.exports = {
    createReference(req, res, next) {
        db.createRef(req.user.user_id, res.locals.space_id)
          .then(data => {
            res.locals.refTable = data;
            next();
          })
          .catch(err => {
            next(err);
          });
    },

    destroyReference(req, res, next) {
        db.deleteRef(req.user.user_id, req.params.space_id)
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
        console.log(data, ' this is from the add user models')
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
                console.log('this is data in getImage', data)
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
          console.log('this is req.body.space_id', req.body.space_id)
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
        console.log(req.body)
        dbUsers.handleAddUser(req.body)
            .then((user) => {
                console.log('username', user)
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
            req.user = await dbUsers.findByUsername(req.tokenData.user.username)
            console.log(req.user)
            return next()
        }
        catch(e) {
            console.log(e)
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
