const { userModel } = require('../model/index')
const { formatUsers } = require('../utils/formatUser')
const md5 = require('../utils/cryp')

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

/**
 *创建用户
 * @param {Object} userinfo
 */
async function createUser ({ userName, password, gender, nickName }) {
  const res = await userModel.create({
    user_name: userName,
    password: md5(password),
    gender,
    nick_name: nickName
  })
  return { id: res.insertId }
}

module.exports = {
  getUserInfo,
  createUser
}
