/*
 * @Author: xukai
 * @Date: 2020-06-02 10:00:51
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 10:07:08
 */

const { ErrorModel } = require('../model/resModel')
const { loginCheckFailInfo } = require('../config/constant').errnoInfo

/**
 *API登录验证
 * @param {Object} ctx
 * @param {funciton} next
 */
async function loginCheck (ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

async function loginRedirect (ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
  }
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}
