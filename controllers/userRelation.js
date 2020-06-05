/*
 * @Author: xukai
 * @Date: 2020-06-03 15:49:41
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-05 16:44:58
 */

const BaseController = require('../controllers/baseController')
const { UserRelationService } = require('../services/index')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo } = require('../config/constant')
const { infoLog, errLog } = require('../libs/logger')

class UserRelation extends BaseController {
  constructor () {
    super()
    this.name = 'UserRelation'
    this.follow = this.follow.bind(this)
    this.unFollow = this.unFollow.bind(this)
    this.getFans = this.getFans.bind(this)
    this.getFollowers = this.getFollowers.bind(this)
  }

  async follow (ctx) {
    try {
      const { id: myUserId } = ctx.session.userInfo
      const { userId: curUserId } = ctx.request.body

      infoLog(this.name, this.follow.name, { myUserId, curUserId })

      const res = await UserRelationService.addFollwer({ userId: myUserId, followerId: curUserId })
      if (res >= 1) {
        ctx.body = new SuccessModel()
      } else {
        ctx.body = new ErrorModel(errnoInfo.addFollowerFailInfo)
      }
    } catch (e) {
      errLog(this.name, this.follow.name, { ctx, error: e })
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.addFollowerFailInfo)
    }
  }

  async unFollow (ctx) {
    try {
      const { id: myUserId } = ctx.session.userInfo
      const { userId: curUserId } = ctx.request.body

      infoLog(this.name, this.unFollow.name, { myUserId, curUserId })

      const res = await UserRelationService.unFollow({ userId: myUserId, followerId: curUserId })
      if (res >= 1) {
        ctx.body = new SuccessModel()
      } else {
        ctx.body = new ErrorModel(errnoInfo.deleteFollowerFailInfo)
      }
    } catch (e) {
      errLog(this.name, this.unFollow.name, { ctx, error: e })
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.deleteFollowerFailInfo)
    }
  }

  async getFans (userId) {
    infoLog(this.name, this.getFans.name, { userId })
    const { count, userList } = await UserRelationService.getFollowersByUser(userId)
    return new SuccessModel({
      count,
      userList
    })
  }

  async getFollowers (followerId) {
    infoLog(this.name, this.getFollowers.name, { followerId })
    const { count, userList } = await UserRelationService.getUsersByFollower(followerId)
    return new SuccessModel({
      count,
      userList
    })
  }
}

module.exports = new UserRelation()
