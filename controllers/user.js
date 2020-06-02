/*
 * @Author: xukai
 * @Date: 2020-06-01 16:03:59
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 13:53:49
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
    this.login = this.login.bind(this)
    this.changeInfo = this.changeInfo.bind(this)
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
        ctx.body = new SuccessModel()
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
        ctx.body = new SuccessModel(res)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.registerFailInfo)
    }
  }

  /**
   * 登陆
   * @param {Object} ctx
   */
  async login (ctx) {
    try {
      const { userName, password } = ctx.request.body
      const userInfo = await service.getUserInfo(userName, password)
      if (!userInfo) {
        ctx.body = new ErrorModel(errnoInfo.loginFailInfo)
      } else {
        if (!ctx.session.userInfo) ctx.session.userInfo = userInfo
        ctx.body = new SuccessModel()
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.registerFailInfo)
    }
  }

  /**
   * 修改信息
   * @param {Object} ctx
   */
  async changeInfo (ctx) {
    try {
      const userName = ctx.session.userInfo.user_name
      const { nickName, city, picture: avatar } = ctx.request.body
      const res = await service.changeInfo({ userName, nickName, city, avatar })
      if (res >= 1) ctx.body = new SuccessModel({ message: '修改成功' })
      else {
        ctx.bdoy = new ErrorModel(errnoInfo.changeInfoFailInfo)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.bdoy = new ErrorModel(errnoInfo.changeInfoFailInfo)
    }
  }
}

module.exports = new UserCtl()
