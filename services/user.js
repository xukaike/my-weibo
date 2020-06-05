const { userModel } = require('../model/index')
const { formatUsers } = require('../utils/format')
const md5 = require('../utils/cryp')

class UserService {
/**
 *获取用户信息
 * @param {string} userName
 * @param {string} password
 */
  static async getUserInfo (userName, password) {
    let res
    if (password) {
      [res] = await userModel.getByName(userName, md5(password))
    } else {
      [res] = await userModel.getByName(userName)
    }
    const user = formatUsers(res)
    return user
  }

  /**
 *创建用户
 * @param {Object} userinfo
 */
  static async createUser ({ userName, password, gender, nickName }) {
    const res = await userModel.create({
      user_name: userName,
      password: md5(password),
      gender,
      nick_name: nickName
    })
    return { id: res.insertId }
  }

  /**
 *修改信息
 * @param {Object} userinfo
 */
  static async changeInfo ({ userName, nickName, city, avatar }) {
    if (!nickName) nickName = userName
    const res = await userModel.update({
      userName, nickName, city, avatar
    })
    return res.affectedRows
  }

  /**
 *修改密码
 * @param {Object} userinfo
 */
  static async changePassword ({ userName, password, newPassword }) {
    const res = await userModel.changePassword({
      userName, password: md5(password), newPassword: md5(newPassword)
    })
    return res.affectedRows
  }
}

module.exports = UserService
