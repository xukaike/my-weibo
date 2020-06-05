const { userRelationModel } = require('../model/index')
const { formatUsers } = require('../utils/format')

class UserRelationService {
  static async addFollwer ({ userId, followerId }) {
    const res = await userRelationModel.create({ userId, followerId })
    return res.affectedRows
  }

  static async unFollow ({ userId, followerId }) {
    const res = await userRelationModel.delete({ userId, followerId })
    return res.affectedRows
  }

  static async getFollowersByUser (userId) {
    const res = await userRelationModel.getFollowersByUser(userId)
    formatUsers(res)
    const count = res.length
    return {
      count,
      userList: res
    }
  }

  static async getUsersByFollower (followerId) {
    const res = await userRelationModel.getUsersByFollower(followerId)
    formatUsers(res)
    const count = res.length
    return {
      count,
      userList: res
    }
  }
}

module.exports = UserRelationService
