const router = require('express').Router();
const controller = require('../controllers/controller');
const resController = require('../controllers/responseController')

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

// this is the login page
router.route('/user')
    .post(controller.login)

router.route('/register')
    // .post(controller.addUser, resController.handleAddingUser);
    .post(controller.register)

// this is the pubic api page
router.route('/')

module.exports = router;
