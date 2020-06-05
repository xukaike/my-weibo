const { blogModel } = require('../model/index')
const { formatBlogs } = require('../utils/format')

class BlogService {
  static async create ({ userId, content, image }) {
    const res = await blogModel.create({ userId, content, image })
    return res
  }

  static async getBlogListByUser ({ userId, pageIndex, pageSize }) {
    let res = await blogModel.getBlogListByUser({ userId, pageIndex, pageSize })
    const blogList = formatBlogs(res)
    res = await blogModel.getBlogListByUser({ userId, count: true })
    const { count } = res[0]
    return {
      blogList, count
    }
  }

  static async getHomeBlogList ({ userId, pageIndex, pageSize }) {
    let res = await blogModel.getHomeBlogList({ userId, pageIndex, pageSize })
    const blogList = formatBlogs(res)
    res = await blogModel.getHomeBlogList({ userId, count: true })
    const { count } = res[0]
    return {
      blogList, count
    }
  }
}

module.exports = BlogService
