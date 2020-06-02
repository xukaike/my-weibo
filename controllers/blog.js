/*
 * @Author: xukai
 * @Date: 2020-06-02 16:20:40
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 16:44:21
 */
const BaseController = require('./baseController')
const service = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo } = require('../config/constant')
const xss = require('xss')

class BlogCtl extends BaseController {
  constructor () {
    super()
    this.name = 'BlogCtl'
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
}

module.exports = new BlogCtl()
