/*
 * @Author: xukai
 * @Date: 2020-06-03 15:49:41
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-05 14:02:21
 */

const BaseController = require('../controllers/baseController')
const { UserRelationService } = require('../services/index')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo } = require('../config/constant')

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
      const res = await UserRelationService.addFollwer({ userId: myUserId, followerId: curUserId })
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

  async unFollow (ctx) {
    try {
      const { id: myUserId } = ctx.session.userInfo
      const { userId: curUserId } = ctx.request.body
      const res = await UserRelationService.unFollow({ userId: myUserId, followerId: curUserId })
      if (res >= 1) {
        ctx.body = new SuccessModel()
      } else {
        ctx.body = new ErrorModel(errnoInfo.deleteFollowerFailInfo)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.deleteFollowerFailInfo)
    }
  }

  async getFans (userId) {
    const { count, userList } = await UserRelationService.getFollowersByUser(userId)
    return new SuccessModel({
      count,
      userList
    })
  }

  async getFollowers (followerId) {
    const { count, userList } = await UserRelationService.getUsersByFollower(followerId)
    return new SuccessModel({
      count,
      userList
    })
  }
}

module.exports = new UserRelation()
