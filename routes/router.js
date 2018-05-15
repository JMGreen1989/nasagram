const router = require('express').Router();
const controller = require('../controllers/controller');
const resController = require('../controllers/responseController')
const tokenService = require('../Services/tokenService')

// this displays individual saved images
router.route('/:space_id')
    .get(controller.getImage, resController.getSingle)
    .delete(controller.destroyImage, controller.destroyReference, resController.confirmDelete)
    .put(controller.update, resController.handleUpdate)

router.route('/token')
    .post(controller.receiveToken, controller.getUserFromToken)

// user profile
router.route('/')
    .get(controller.getCustomFeed, resController.customFeed)
    .post(controller.addImage, controller.createReference, resController.sendRef)


module.exports = router;
