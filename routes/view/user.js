const router = require('koa-joi-router')()
const { loginRedirect } = require('../../middleware/loginCheck')
const { formatUsers } = require('../../utils/format')

function getLoginInfo (ctx) {
  let data = {
    isLogin: false
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
  const userInfo = formatUsers(ctx.session.userInfo)
  await ctx.render('setting', userInfo)
})

module.exports = router
