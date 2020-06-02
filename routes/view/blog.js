const router = require('koa-joi-router')()
const { loginRedirect } = require('../../middleware/loginCheck')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router
