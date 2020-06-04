const { atRelationModel } = require('../model/index')
const { formatBlogs } = require('../utils/format')

async function createRelation (userId, blogId) {
  const res = await atRelationModel.create(userId, blogId)
  return res.affectedRows
}

async function getAtMeCount (userId) {
  const [res] = await atRelationModel.getAtMeCount(userId)
  return res
}

async function getAtMeBlogList ({ userId, pageIndex, pageSize }) {
  let res = await atRelationModel.getAtMeBlog({ userId, pageIndex, pageSize })
  const blogList = formatBlogs(res)
  res = await atRelationModel.getAtMeBlog({ userId, count: true })
  const { count } = res[0]
  return {
    blogList, count
  }
}

async function markAsRead (userId) {
  const res = await atRelationModel.markAsRead(userId)
  return res.affectedRows
}

module.exports = {
  createRelation,
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}
