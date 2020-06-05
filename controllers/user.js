/*
 * @Author: xukai
 * @Date: 2020-06-01 16:03:59
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-05 14:01:58
 */
const BaseController = require('./baseController')
const { UserService, UserRelationService } = require('../services/index')
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
      const userInfo = await UserService.getUserInfo(userName)
      if (!userInfo) {
        ctx.body = new ErrorModel(errnoInfo.registerUserNameNotExistInfo)
      } else {
        ctx.body = new SuccessModel(userInfo)
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
      const userInfo = await UserService.getUserInfo(userName)
      if (userInfo) {
        ctx.body = new ErrorModel(errnoInfo.registerUserNameExistInfo)
      } else {
        const res = await UserService.createUser({
          userName,
          password,
          gender,
          nickName: userName
        })
        await UserRelationService.addFollwer({ userId: res.id, followerId: res.id })
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
      const userInfo = await UserService.getUserInfo(userName, password)
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
      const res = await UserService.changeInfo({ userName, nickName, city, avatar })
      const userInfo = await UserService.getUserInfo(userName)
      ctx.session.userInfo = userInfo
      if (res >= 1) ctx.body = new SuccessModel({ message: '修改成功' })
      else {
        ctx.body = new ErrorModel(errnoInfo.changeInfoFailInfo)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.changeInfoFailInfo)
    }
  }

  /**
   * 修改密码
   * @param {Object} ctx
   */
  async changePassword (ctx) {
    try {
      const { password, newPassword } = ctx.request.body
      const userName = ctx.session.userInfo.user_name
      const res = await UserService.changePassword({ userName, password, newPassword })
      if (res >= 1) ctx.body = new SuccessModel({ message: '修改成功' })
      else {
        ctx.body = new ErrorModel(errnoInfo.changePasswordFailInfo)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.changePasswordFailInfo)
    }
  }

  /**
 * 退出登录
 * @param {Object} ctx ctx
 */
  async logout (ctx) {
    delete ctx.session.userInfo
    ctx.body = new SuccessModel()
  }
}

module.exports = new UserCtl()
