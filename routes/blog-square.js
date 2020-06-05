const profile = require('koa-joi-router')()
const { loginCheck } = require('../middleware/loginCheck')
const blogCtl = require('../controllers/blog')
const { getBlogListStr } = require('../utils/blog')

profile.prefix('/api/square')

profile.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const res = await blogCtl.getSquareBlogList(pageIndex)

  res.data.blogListTpl = getBlogListStr(res.data.blogList)

  ctx.body = res
})

module.exports = profile
