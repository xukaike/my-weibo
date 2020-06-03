const router = require('koa-joi-router')()
const { loginRedirect } = require('../../middleware/loginCheck')
const userSevices = require('../../services/user')
const blogCtl = require('../../controllers/blog')
const { formatUsers } = require('../../utils/format')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const userName = ctx.session.userInfo.user_name
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.user_name

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const existResult = await userSevices.getUserInfo(curUserName)
    if (!existResult) {
      return
    }
    curUserInfo = existResult
  }
  formatUsers(curUserInfo)

  const result = await blogCtl.getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {},
      follwersData: {},
      amIFollowed: false,
      atCount: 0
    }
  })
})

module.exports = router
