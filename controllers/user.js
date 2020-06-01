/*
 * @Author: xukai
 * @Date: 2020-06-01 16:03:59
 * @Last Modified by:   xukai
 * @Last Modified time: 2020-06-01 16:03:59
 */
const BaseController = require('./baseController')
const service = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo } = require('../config/constant')

class UserCtl extends BaseController {
  constructor () {
    super()
    this.name = 'UserCtl'
    this.isExist = this.isExist.bind(this)
    this.register = this.register.bind(this)
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
        ctx.body = new ErrorModel(errnoInfo.registerUserNameNotExistInfo)
      } else {
        ctx.body = new SuccessModel({
          id: userInfo.id,
          userName: userInfo.userName
        })
      }
    } catch (e) {
      this.errorHandler(e)
    }
  }

  /**
   * 注册
   * @param {Object} ctx
   */
  async register (ctx) {
    try {
      const { userName, password, gender } = ctx.request.body
      const userInfo = await service.getUserInfo(userName)
      if (userInfo) {
        ctx.body = new ErrorModel(errnoInfo.registerUserNameExistInfo)
      } else {
        const res = await service.createUser({
          userName,
          password,
          gender,
          nickName: userName
        })
        return new SuccessModel(res)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.registerFailInfo)
    }
  }
}

module.exports = new UserCtl()
