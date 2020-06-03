/*
 * @Author: xukai
 * @Date: 2020-06-03 15:49:41
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 16:09:54
 */

const BaseController = require('../controllers/baseController')
const service = require('../services/userRelation')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo } = require('../config/constant')

class UserRelation extends BaseController {
  constructor () {
    super()
    this.name = 'UserRelation'
    this.follow = this.follow.bind(this)
  }

  async follow (ctx) {
    try {
      const { id: myUserId } = ctx.session.userInfo
      const { userId: curUserId } = ctx.request.body
      const res = await service.addFollwer({ userId: myUserId, followerId: curUserId })
      if (res >= 1) {
        ctx.body = new SuccessModel()
      } else {
        ctx.body = new ErrorModel(errnoInfo.addFollowerFailInfo)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.addFollowerFailInfo)
    }
  }
}

module.exports = new UserRelation()
