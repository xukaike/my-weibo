const { userModel } = require('../model/index')
const { formatUsers } = require('../utils/formatUser')

/**
 *获取用户信息
 * @param {string} userName
 * @param {string} password
 */
async function getUserInfo (userName, password) {
  if (!password) {
    const [res] = await userModel.getByName(userName)
    const user = formatUsers(res)
    return user
  }
}

module.exports = {
  getUserInfo
}
