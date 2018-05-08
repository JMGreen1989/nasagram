const db    = require('../models/model');

function getAllSpace (req, res, next) {
  db.getAllSpaceImgs()
  .then(data =>{
    res.locals.space = data;
    next();
  })
  .catch(err => {
      next(err)
  })
}

function getAllUsers (req, res, next) {
  db.getAllUsers()
  .then(data =>{
    res.locals.user = data;
    next();
  })
  .catch(err => {
      next(err)
  })
}

function createReference(req, res, next) {
    db.createRef(1, res.locals.space_id)
      .then(data => {
        res.locals.refTable = data;
        next();
      })
      .catch(err => {
        next(err);
      });
}

function addImage(req, res, next) {
    db.handleSubmit(req.body)
      .then(data => {
        res.locals.space_id = data.space_id;
        next();
      })
      .catch(err => {
        next(err);
      });
}

function getCustomFeed(req, res, next){
    db.joingTables(1)
    .then(data => {
        res.locals.customFeed = data.map((elem, i ) => (elem))
        console.log(res.locals.customFeed)
        next();
    })
    .catch(err => {
        next(err);
    });
}

module.exports = {
  getAllSpace,
  getAllUsers,
  createReference,
  addImage,
  getCustomFeed,
}
