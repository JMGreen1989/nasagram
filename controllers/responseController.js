function sendSpace(req, res) {
  res.json({
    status: 'ok',
    data: res.locals.space
  })
}

function sendUsers(req, res) {
  res.json({
    status: 'ok',
    data: res.locals.user
  })
}

function sendNewImage(req, res) {
  res.json({
    status: 'ok',
    data: res.locals.image
  })
}

function sendRef(req, res) {
  res.json({
    status: 'ok',
    data: res.locals.refTable
  })
}

function customFeed(req, res) {
    res.json({
        status: 'ok',
        data: res.locals.customFeed
    })
}

function sendErrorResponse(err, req, res, next) {
  res.json({
    status: 'Error',
    message: err.message
  })
}

module.exports = {
  sendUsers,
  sendSpace,
  sendRef,
  sendNewImage,
  customFeed,
  sendErrorResponse,
}
