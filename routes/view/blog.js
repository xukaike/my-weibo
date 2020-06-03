const router = require('koa-joi-router')()
const { loginRedirect } = require('../../middleware/loginCheck')
const userSevices = require('../../services/user')
const blogCtl = require('../../controllers/blog')
const { formatUsers } = require('../../utils/format')
const { getFans, getFollowers } = require('../../controllers/userRelation')

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

  // 获取微博
  const result = await blogCtl.getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  let res = await getFans(curUserInfo.id)
  const { count: fansCount, userList: fansList } = res.data

  // 获取关注人列表
  res = await getFollowers(curUserInfo.id)
  const { count: followersCount, userList: followersList } = res.data

  // 我是否关注了此人？
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })

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
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      amIFollowed,
      atCount: 0
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await blogCtl.getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

module.exports = router
