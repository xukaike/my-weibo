/*
 * @Author: xukai
 * @Date: 2020-06-02 16:20:40
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-04 11:27:01
 */
const BaseController = require('./baseController')
const service = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errnoInfo, PAGE_SIZE, REG_AT } = require('../config/constant')
const xss = require('xss')
const { getSquareCache } = require('../cache/square')
const { getUserInfo } = require('../services/user')
const { createRelation } = require('../services/atRelation')

class BlogCtl extends BaseController {
  constructor () {
    super()
    this.name = 'BlogCtl'
    this.create = this.create.bind(this)
    this.getProfileBlogList = this.getProfileBlogList.bind(this)
    this.getSquareBlogList = this.getSquareBlogList.bind(this)
  }

  async create (ctx) {
    try {
      let { content, image } = ctx.request.body
      const { id: userId } = ctx.session.userInfo

      // 获取@关系
      const atUserNameList = []
      content = content.replace(REG_AT, (matchSrt, nickName, userName) => {
        atUserNameList.push(userName)
        return matchSrt
      })

      // 获取用户信息
      const atUserList = await Promise.all(
        atUserNameList.map(user => { return getUserInfo(user) })
      )
      const atUserIdList = atUserList.map(user => user.id)

      // 创建微博
      const res = await service.create({ userId, content: xss(content), image })
      if (res.affectedRows >= 1) {
        ctx.body = new SuccessModel()

        // 创建at关系
        await Promise.all(atUserIdList.map(id => {
          createRelation(id, res.insertId)
        }))
      } else {
        ctx.body = new ErrorModel(errnoInfo.createBlogFailInfo)
      }
    } catch (e) {
      this.errorHandler(e)
      ctx.body = new ErrorModel(errnoInfo.createBlogFailInfo)
    }
  }

  /**
   * 获取个人页面微博
   * @param {string} userName
   * @param {number} pageIndex
   */
  async getProfileBlogList (userId, pageIndex = 0) {
    try {
      const result = await service.getBlogListByUser({
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

  /**
   * 获取广场数据
   * @param {number} pageIndex
   */
  async getSquareBlogList (pageIndex = 0) {
    try {
      const result = await getSquareCache(pageIndex, PAGE_SIZE)
      const blogList = result.blogList

      return new SuccessModel(
        {
          isEmpty: blogList.length === 0,
          blogList,
          pageSize: PAGE_SIZE,
          pageIndex,
          count: result.count
        }
      )
    } catch (e) {
      this.errorHandler(e)
    }
  }

  /**
   * 获取首页微博
   * @param {string} userName
   * @param {number} pageIndex
   */
  async getHomeBlogList (userId, pageIndex = 0) {
    try {
      const result = await service.getHomeBlogList({
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
}

module.exports = new BlogCtl()
