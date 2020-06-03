const profile = require('koa-joi-router')()
const { loginCheck } = require('../middleware/loginCheck')
const { getProfileBlogList } = require('../controllers/blog')
const { getBlogListStr } = require('../utils/blog')

profile.prefix('/api/profile')

profile.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const res = await getProfileBlogList(userName, pageIndex)

  res.data.blogListTpl = getBlogListStr(res.data.blogList)

  ctx.body = res
})

module.exports = profile
