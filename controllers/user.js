const BaseController = require('./baseController')
const service = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo } = require('../config/constant')

class UserCtl extends BaseController {
  constructor () {
    super()
    this.name = 'UserCtl'
    this.isExist = this.isExist.bind(this)
  }

  /**
 * 查询用户是否存在
 * @param {string} userName 用户名
 */
  async isExist (ctx) {
    try {
      const { userName } = ctx.request.body
      const userInfo = await service.getUserInfo(userName)
      if (!userInfo) {
        const res = new ErrorModel(errnoInfo.registerUserNameNotExistInfo)
        ctx.body = res
      } else {
        ctx.body = new SuccessModel(userInfo)
      }
    } catch (e) {
      this.errorHandler(e)
    }
  }

  async register (ctx) {

  }
}

module.exports = new UserCtl()
