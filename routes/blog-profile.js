const router = require('koa-joi-router')
const { loginCheck } = require('../middleware/loginCheck')
const { getProfileBlogList } = require('../controllers/blog')
const { getBlogListStr } = require('../utils/blog')
const userRelationCtl = require('../controllers/userRelation')
const Joi = router.Joi
const profile = router()

profile.prefix('/api/profile')

profile.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const res = await getProfileBlogList(userName, pageIndex)

  res.data.blogListTpl = getBlogListStr(res.data.blogList)

  ctx.body = res
})

profile.route({
  method: 'post',
  path: '/follow',
  validate: {
    body: {
      userId: Joi.number()
    },
    type: 'json'
  },
  handler: [loginCheck, userRelationCtl.follow]
})

module.exports = profile
