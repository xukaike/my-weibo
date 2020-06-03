const { blogModel } = require('../model/index')
const { formatBlogs } = require('../utils/format')

async function create ({ userId, content, image }) {
  const res = await blogModel.create({ userId, content, image })
  return res.affectedRows
}

async function getBlogListByUser ({ userName, pageIndex, pageSize }) {
  let res = await blogModel.getBlogListByUser({ userName, pageIndex, pageSize })
  const blogList = formatBlogs(res)
  res = await blogModel.getBlogListByUser({ userName, count: true })
  const { count } = res[0]
  return {
    blogList, count
  }
}

module.exports = {
  create,
  getBlogListByUser
}
