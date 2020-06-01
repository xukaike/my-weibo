
const config = require('config')
const deafultAvatar = config.deafultAvatar

function _formatUserAvatar (obj) {
  if (!obj.avatar) {
    obj.picture = deafultAvatar
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
