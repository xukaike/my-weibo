const { atRelationModel } = require('../model/index')
const { formatBlogs } = require('../utils/format')

class AtRelationService {
  static async createRelation (userId, blogId) {
    const res = await atRelationModel.create(userId, blogId)
    return res.affectedRows
  }

  static async getAtMeCount (userId) {
    const [res] = await atRelationModel.getAtMeCount(userId)
    return res
  }

  static async getAtMeBlogList ({ userId, pageIndex, pageSize }) {
    let res = await atRelationModel.getAtMeBlog({ userId, pageIndex, pageSize })
    const blogList = formatBlogs(res)
    res = await atRelationModel.getAtMeBlog({ userId, count: true })
    const { count } = res[0]
    return {
      blogList, count
    }
  }

  static async markAsRead (userId) {
    const res = await atRelationModel.markAsRead(userId)
    return res.affectedRows
  }
}

module.exports = AtRelationService
