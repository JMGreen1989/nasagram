const db           = require('../models/model');
const dbUsers      = require('../models/userModel');
const tokenService = require('../Services/tokenService');
const bcrypt       = require('bcrypt');
const saltRounds   = 10;

module.exports = {
    createReference(req, res, next) {
        console.log(res.locals.userID, ' llooooooookkkk im inside the createReference')
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
        console.log('I MADE IT THROUGHHHHHHHHHHH', req.headers.authorization)

        const unverifiedToken = req.headers.authorization.replace(/^Bearer/, '');
        console.log('I MADE IT THROUGHHHHHHHHHHH: unverified token ', unverifiedToken)
        return tokenService.verify(unverifiedToken, {iss: 'nasagram'}, (err, data) => {
            req.tokenData=data
            console.log(req.tokenData, ' im inside the receiveToken')
            next()
        })
    },

    async getUserFromToken(req, res, next){

        if(!req.tokenData){
            return next()
        }

        try {
            req.user = await dbUsers.getId(req.tokenData.user.username)
            res.locals.userID = req.user.user_id
            console.log(res.locals.userID, ' llooooooookkkk here')
            
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
