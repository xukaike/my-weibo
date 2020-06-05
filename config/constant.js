module.exports = {
  // 默认头像
  defaultAvatar: '/default.jpg',
  // 错误信息
  errnoInfo: {
    // 用户名已存在
    registerUserNameExistInfo: {
      errno: 10001,
      message: '用户名已存在'
    },
    // 注册失败
    registerFailInfo: {
      errno: 10002,
      message: '注册失败，请重试'
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
      errno: 10003,
      message: '用户名不存在'
    },
    // 登录失败
    loginFailInfo: {
      errno: 10004,
      message: '登录失败，用户名或密码错误'
    },
    // 未登录
    loginCheckFailInfo: {
      errno: 10005,
      message: '您尚未登录'
    },
    // 修改密码失败
    changePasswordFailInfo: {
      errno: 10006,
      message: '修改密码失败，请重试'
    },
    // 上传文件过大
    uploadFileSizeFailInfo: {
      errno: 10007,
      message: '上传文件尺寸过大'
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
      errno: 10008,
      message: '修改基本信息失败'
    },
    // json schema 校验失败
    jsonSchemaFileInfo: {
      errno: 10009,
      message: '数据格式校验错误'
    },
    // 删除用户失败
    deleteUserFailInfo: {
      errno: 10010,
      message: '删除用户失败'
    },
    // 添加关注失败
    addFollowerFailInfo: {
      errno: 10011,
      message: '添加关注失败'
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
      errno: 10012,
      message: '取消关注失败'
    },
    // 创建微博失败
    createBlogFailInfo: {
      errno: 11001,
      message: '创建微博失败，请重试'
    },
    // 删除微博失败
    deleteBlogFailInfo: {
      errno: 11002,
      message: '删除微博失败，请重试'
    }
  },
  // 加密key
  CRYPTO_SECRET_KEY: 'Shbg_u2n98zK',
  // session加密
  SESSION_SECRET_KEY: 'uhng7$aon_',
  PAGE_SIZE: 5,
  // 正则表达式，匹配 '@昵称 - userName'
  REG_AT: /@(.+?)\s-\s(\w+?)\b/g,
  // 微博广场数据缓存key
  SQUARE_KEY_PREFIX: 'weibo:square:',
  // 微博广场缓存时间
  SQUARE_CACHE_TIMEOUT: 60, // 秒
  // 错误日志
  ERROR_LOG_NAME: './logs/error.log',
  // 日志
  APP_LOG_NAME: './logs/app-%DATE%.log',
  // 日志最大保存天数
  SAVE_DAYS: '7d'
}
