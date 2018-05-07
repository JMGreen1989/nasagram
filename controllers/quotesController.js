const quoteDb = require('../models/quote');

function getAll(req, res, next) {
  quoteDb.getAll()
    .then(data => {
      res.locals.quotes = data;
      next();
    })
    .catch(next);
}

function getOne(req, res, next) {
  quoteDb.getOne(req.params.id)
    .then(data => {
      res.locals.quote = data;
      next();
    })
    .catch(next);
}

function create(req, res, next) {
  quoteDb.create(req.body)
    .then(data => {
      res.locals.quote = data;
      next();
    })
    .catch(next);
}

function update(req, res, next) {
  quoteDb.update(req.body)
    .then(data => {
      res.locals.quote = data;
      next();
    })
    .catch(next);
}

function destroy(req, res, next) {
  quoteDb.destroy(req.params.id)
    .then(() => {
      next()
    })
    .catch(next);
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
};
