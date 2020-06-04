const at = require('koa-joi-router')()
const { loginCheck } = require('../middleware/loginCheck')
const { getAtMeBlogList } = require('../controllers/atRelation')
const { getBlogListStr } = require('../utils/blog')

at.prefix('/api/atMe')

at.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex) // 转换 number 类型
  const { id: userId } = ctx.session.userInfo
  const result = await getAtMeBlogList({ userId, pageIndex })
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = at
