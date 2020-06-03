/*
 * @Author: xukai
 * @Date: 2020-06-02 16:20:40
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 17:27:21
 */
const BaseController = require('./baseController')
const service = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo, PAGE_SIZE } = require('../config/constant')
const xss = require('xss')

class BlogCtl extends BaseController {
  constructor () {
    super()
    this.name = 'BlogCtl'
    this.create = this.create.bind(this)
    this.getProfileBlogList = this.getProfileBlogList.bind(this)
  }

  async create (ctx) {
    try {
      const { content, image } = ctx.request.body
      const { id: userId } = ctx.session.userInfo
      const res = await service.create({ userId, content: xss(content), image })
      if (res >= 1) ctx.body = new SuccessModel()
      else {
        ctx.body = new ErrorModel(errnoInfo.createBlogFailInfo)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.createBlogFailInfo)
    }
  }

  async getProfileBlogList (userName, pageIndex = 0) {
    try {
      const result = await service.getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
      })
      const blogList = result.blogList

      // 拼接返回数据
      return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
      })
    } catch (e) {
      this.errorHandler(e)
    }
  }
}

module.exports = new BlogCtl()
