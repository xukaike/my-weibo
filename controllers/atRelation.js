/*
 * @Author: xukai
 * @Date: 2020-06-02 16:20:40
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-05 13:57:29
 */
const BaseController = require('./baseController')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { AtRelationService } = require('../services/index')
const { PAGE_SIZE } = require('../config/constant')

class AtRelationCtl extends BaseController {
  constructor () {
    super()
    this.name = 'atRelationCtl'
    this.getAtMeBlogList = this.getAtMeBlogList.bind(this)
    this.getAtMeCount = this.getAtMeCount.bind(this)
  }

  async getAtMeCount (userId) {
    try {
      const res = await AtRelationService.getAtMeCount(userId)
      const { count } = res
      return new SuccessModel({ count })
    } catch (e) {
      this.errorHandler(e)
    }
  }

  async getAtMeBlogList ({ userId, pageIndex = 0 }) {
    try {
      const result = await AtRelationService.getAtMeBlogList({
        userId,
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

  async markAsRead (userId) {
    try {
      const res = await AtRelationService.markAsRead(userId)
      if (res > 1) return new SuccessModel()
    } catch (e) {
      this.errorHandler(e)
    }
  }
}

module.exports = new AtRelationCtl()
