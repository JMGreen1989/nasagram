module.exports = {
    sendNewImage(req, res) {
      res.json(res.locals.image)
    },

    sendRef(req, res) {
      res.json(res.locals.refTable)
    },

    customFeed(req, res) {
        res.json(res.locals.customFeed)
    },

    getSingle(req, res) {
        res.json(res.locals.single)
    },

    handleAddingUser(req, res) {
      res.json({
        status: 'ok',
        data: res.locals.user
      })
    },

    sendErrorResponse(err, req, res, next) {
      res.json({
        status: 'Error',
        message: err.message
      })
    },

    confirmEdit(err, req, res, next) {
        res.json({
          status: 'ok',
          message: 'you\'ve edited a description'
        })
    },

    handleUpdate(err, req, res, next) {
        res.json({
            status: 'ok',
            data: res.locals.newItem
        })
    },

    confirmDelete(err, req, res, next){
        res.json({
          status: 'ok',
          message: 'you\'ve deleted an image'
        })
    },
}
