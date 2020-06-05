const router = require('koa-joi-router')
const Joi = router.Joi
const blog = router()
const { loginCheck } = require('../middleware/loginCheck')
const blogCtl = require('../controllers/blog')
const { getBlogListStr } = require('../utils/blog')

blog.prefix('/api/blog')

// 创建微博
blog.route({
  method: 'POST',
  path: '/create',
  validate: {
    body: {
      content: Joi.string().allow(null, ''),
      image: Joi.string().allow(null, '')
    },
    type: 'json'
  },
  handler: [loginCheck, blogCtl.create]
})

// 加载更多
blog.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex) // 转换 number 类型
  const { id: userId } = ctx.session.userInfo
  const result = await blogCtl.getHomeBlogList(userId, pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = blog
