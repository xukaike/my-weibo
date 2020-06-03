/*
 * @Author: xukai
 * @Date: 2020-06-01 16:52:19
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 13:42:05
 */

const { defaultAvatar, REG_AT } = require('../config/constant')
const { timeFormat } = require('../utils/timeFormat')

function _formatUser (obj) {
  if (!obj.avatar) {
    obj.avatar = defaultAvatar
  }
  obj.userName = obj.user_name
  obj.nickName = obj.nick_name
  obj.picture = obj.avatar
  return obj
}

/**
 *格式化用户信息
 * @param {Array|Object} list
 */
function formatUsers (list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatUser)
  }

  return _formatUser(list)
}

function _formatBlog (obj) {
  obj.user = {
    picture: obj.avatar || defaultAvatar,
    nickName: obj.nick_name,
    userName: obj.user_name
  }
  obj = _formatContent(obj)
  obj = _formatDBTime(obj)
  return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent (obj) {
  obj.contentFormat = obj.content

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_AT,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )
  return obj
}

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime (obj) {
  obj.createdAtFormat = timeFormat(obj.created_at)
  obj.updatedAtFormat = timeFormat(obj.updated_at)
  return obj
}

/**
 * 格式化微博
 * @param {Array|Object} list
 */
function formatBlogs (list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatBlog)
  }

  return _formatBlog(list)
}

module.exports = {
  formatUsers,
  formatBlogs
}
