const { blogModel } = require('../model/index')
const { formatBlogs } = require('../utils/format')

async function create ({ userId, content, image }) {
  const res = await blogModel.create({ userId, content, image })
  return res
}

async function getBlogListByUser ({ userId, pageIndex, pageSize }) {
  let res = await blogModel.getBlogListByUser({ userId, pageIndex, pageSize })
  const blogList = formatBlogs(res)
  res = await blogModel.getBlogListByUser({ userId, count: true })
  const { count } = res[0]
  return {
    blogList, count
  }
}

async function getHomeBlogList ({ userId, pageIndex, pageSize }) {
  let res = await blogModel.getHomeBlogList({ userId, pageIndex, pageSize })
  const blogList = formatBlogs(res)
  res = await blogModel.getHomeBlogList({ userId, count: true })
  const { count } = res[0]
  return {
    blogList, count
  }
}

module.exports = {
  create,
  getBlogListByUser,
  getHomeBlogList
}
