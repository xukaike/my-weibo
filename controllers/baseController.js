/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:03
 * @Last Modified by:   xukai
 * @Last Modified time: 2020-06-01 16:04:03
 */
class BaseController {
  constructor () {
    this.name = 'baseController'
  }

  errorHandler (err) {
    console.error(err)
  }
}

module.exports = BaseController
