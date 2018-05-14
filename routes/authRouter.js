const authRouter = require('express').Router();
const controller = require('../controllers/controller');
const resController = require('../controllers/responseController')
const tokenService = require('../Services/tokenService')

// this is the register page
authRouter.route('/register')
    .post(controller.register)

// this is the login page
authRouter.route('/')
    .post(controller.authenticate, resController.errNeedToken, resController.sendToken)

module.exports = authRouter;
