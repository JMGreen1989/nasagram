
  const spaceRouter = require('express').Router();

  const spaceController = require('/space/spaceController');

  const spaceViewController = require('space/spaceViewController');


  function sendThisError(err, req, res, next) {
  res.status(500).json({
    status: 'an error has occurred',
    message: err.message
  })
}


  spaceRouter.route('/')
  .get(spaceController.getOneSpace, playViewController.lookAtSpace, sendThisError)
  .post(spaceController.createSpaceImg, playController.spaceLayout, playViewController.lookAtSpace);

  spaceRouter.route('/space/:id')
  .get(spaceController.getOneSpace, playViewController.showSpaceImg, sendThisError)
  .delete(playController.destroyPlayGame, playViewController.deleteGame);




