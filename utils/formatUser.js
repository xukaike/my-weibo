/*
 * @Author: xukai
 * @Date: 2020-06-01 16:52:19
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-01 16:52:45
 */

const { defaultAvatar } = require('../config/constant')

function _formatUserAvatar (obj) {
  if (!obj.avatar) {
    obj.avatar = defaultAvatar
  }
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
    return list.map(_formatUserAvatar)
  }

  return _formatUserAvatar(list)
}

module.exports = {
  formatUsers
}
