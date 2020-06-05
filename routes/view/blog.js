const router = require('koa-joi-router')()
const { loginRedirect } = require('../../middleware/loginCheck')
const { UserService } = require('../../services/index')
const blogCtl = require('../../controllers/blog')
const { formatUsers } = require('../../utils/format')
const userRelationCtl = require('../../controllers/userRelation')
const atRelationCtl = require('../../controllers/atRelation')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const result = await blogCtl.getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  let res = await userRelationCtl.getFans(userId)
  const { count: fansCount, userList: fansList } = res.data

  // 获取关注人列表
  res = await userRelationCtl.getFollowers(userId)
  const { count: followersCount, userList: followersList } = res.data

  // 获取@数量
  const atCountRes = await atRelationCtl.getAtMeCount(userId)
  const { count: atCount } = atCountRes.data

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
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
    const existResult = await UserService.getUserInfo(curUserName)
    if (!existResult) {
      return
    }
    curUserInfo = existResult
  }
  formatUsers(curUserInfo)

  // 获取微博
  const result = await blogCtl.getProfileBlogList(curUserInfo.id, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  let res = await userRelationCtl.getFans(curUserInfo.id)
  const { count: fansCount, userList: fansList } = res.data

  // 获取关注人列表
  res = await userRelationCtl.getFollowers(curUserInfo.id)
  const { count: followersCount, userList: followersList } = res.data

  // 我是否关注了此人？
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })

  // 获取@数量
  const atCountRes = await atRelationCtl.getAtMeCount(myUserInfo.id)
  const { count: atCount } = atCountRes.data

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
      atCount
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

// @我
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo

  // 获取@数量
  const atCountRes = await atRelationCtl.getAtMeCount(userId)
  const { count: atCount } = atCountRes.data
  // 获取@我的微博
  const blogRes = await atRelationCtl.getAtMeBlogList({ userId })
  const { isEmpty, blogList, pageSize, pageIndex, count } = blogRes.data

  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })

  // 标记为已读
  if (atCount > 0) {
    await atRelationCtl.markAsRead(userId)
  }
})

module.exports = router
