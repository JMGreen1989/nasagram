const router = require('express').Router();
const controller = require('../controllers/controller');
const resController = require('../controllers/responseController')

// getCustomFeed
router.route('/user/:id')
    .get(controller.getCustomFeed, resController.customFeed)
    .post(controller.addImage, controller.createReference, resController.sendRef)
    // edit description
    // post image
    // delete post

// this is the login page
router.route('/user')

// this is the pubic api page
router.route('/')


module.exports = router;
