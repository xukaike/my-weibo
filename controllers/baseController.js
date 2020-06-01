class BaseController {
  constructor () {
    this.name = 'baseController'
  }

  errorHandler (err) {
    console.error(err)
  }
}

module.exports = BaseController
