const { blogModel } = require('../model/index')
const { formatBlogs } = require('../utils/format')

async function create ({ userId, content, image }) {
  const res = await blogModel.create({ userId, content, image })
  return res.affectedRows
}

async function getBlogListByUser ({ userName, pageIndex, pageSize }) {
  const res = await blogModel.getBlogListByUser({ userName, pageIndex, pageSize })
  const blogList = formatBlogs(res)
  const count = blogList.length
  return {
    blogList, count
  }
}

module.exports = {
  create,
  getBlogListByUser
}
