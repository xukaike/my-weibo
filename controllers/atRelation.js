/*
 * @Author: xukai
 * @Date: 2020-06-02 16:20:40
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-05 15:19:36
 */
const BaseController = require('./baseController')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { AtRelationService } = require('../services/index')
const { PAGE_SIZE } = require('../config/constant')
const { infoLog, errLog } = require('../libs/logger')

class AtRelationCtl extends BaseController {
  constructor () {
    super()
    this.name = 'atRelationCtl'
    this.getAtMeBlogList = this.getAtMeBlogList.bind(this)
    this.getAtMeCount = this.getAtMeCount.bind(this)
  }

  async getAtMeCount (userId) {
    try {
      infoLog(this.name, this.getAtMeCount.name, { userId })
      const res = await AtRelationService.getAtMeCount(userId)
      const { count } = res
      return new SuccessModel({ count })
    } catch (e) {
      errLog(this.name, this.getAtMeCount.name, { userId, error: e })
      this.errorHandler(e)
    }
  }

  async getAtMeBlogList ({ userId, pageIndex = 0 }) {
    try {
      infoLog(this.name, this.getAtMeCount.name, { userId, pageIndex })
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
      errLog(this.name, this.getAtMeBlogList.name, { userId, pageIndex, error: e })
      this.errorHandler(e)
    }
  }

  async markAsRead (userId) {
    try {
      infoLog(this.name, this.markAsRead.name, { userId })
      const res = await AtRelationService.markAsRead(userId)
      if (res > 1) return new SuccessModel()
    } catch (e) {
      errLog(this.name, this.markAsRead.name, { userId, error: e })
      this.errorHandler(e)
    }
  }
}

module.exports = new AtRelationCtl()
