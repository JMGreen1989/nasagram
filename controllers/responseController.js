module.exports = {
    sendNewImage(req, res) {
      res.json({
        status: 'ok',
        data: res.locals.image
      })
    },

    sendRef(req, res) {
      res.json({
        status: 'ok',
        data: res.locals.refTable
      })
    },

    customFeed(req, res) {
        res.json({
            status: 'ok',
            data: res.locals.customFeed
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

    // confirmSelect(err, req, res, next) {
    //     res.json({
    //       status: 'ok',
    //       data: res.locals.current
    //     })
    // },

    confirmDelete(err, req, res, next){
        res.json({
          status: 'ok',
          message: 'you\'ve deleted an image'
        })
    },
}
