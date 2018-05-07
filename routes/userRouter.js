
  const userRouter = require('express').Router();

  const userController = require('/user/userController');

  const userViewController = require('/user/userViewController');


  function sendThisError(err, req, res, next) {
  res.status(500).json({
    status: 'an error has occurred',
    message: err.message
  })
}


  userRouter.route()
  .get()
  .post()


