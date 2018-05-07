const qr = require('express').Router();

const quotesController = require('../controllers/quotesController');
const responseController = require('../controllers/responseController');

qr.route('/')
  .get(
    quotesController.getAll,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  .post(
    quotesController.create,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  );

qr.route('/:id')
  .get(
    quotesController.getOne,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  .put(
    quotesController.update,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  .delete(
    quotesController.destroy,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )

module.exports = qr;
