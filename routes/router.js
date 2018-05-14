const router = require('express').Router();
const controller = require('../controllers/controller');
const resController = require('../controllers/responseController')
const tokenService = require('../Services/tokenService')

// this displays individual saved images
router.route('/space/:space_id')
    .get(controller.getImage, resController.getSingle)
    .delete(controller.destroyImage, controller.destroyReference, resController.confirmDelete)
    .put(controller.update, resController.handleUpdate)

// this displays the api for the user
router.route('/user/:id/api')

// user profile
router.route('/user/:id')
    .get(controller.getCustomFeed, resController.customFeed)
    .post(controller.addImage, controller.createReference, resController.sendRef)

// check for token
router.route('/token')
    .get(controller.receiveToken, controller.isLoggedin)

// this is the login page
router.route('/auth')
    .post(controller.authenticate, resController.errNeedToken, resController.sendToken)

// this is the register page
router.route('/register')
    .post(controller.register)

// this is the pubic api page
router.route('/')

module.exports = router;
