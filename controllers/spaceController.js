const spaceDb    = require('/Space/spaceModels');


function spaceLayout (req, res, next) {
  spaceDb.getAllSpaceImgs()
  .then(data =>{
    res.locals.space = data;
    next();
  })
  .catch(err => {

  })
}


function getOneSpace (req, res, next) {}


function createSpaceImg (req, res, next) {}


function editSpaceImg (req, res, next) {}


function updateSpaceImg (req, res, next) {}


function destroySpaceImg (req, res, next) {}

module.exports = {
  spaceLayout,
  getOneSpace,
  createSpaceImg,
  editSpaceImg,
  updateSpaceImg,
  destroySpaceImg
}
