/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 17:28:23
 */
const { query } = require('./db')

class UserModel {
  constructor () {
    this.name = UserModel
    this.userTable = 'user'
  }

  getByName (userName, password) {
    let sql = `SELECT ${this.userTable}.id, ${this.userTable}.user_name, ${this.userTable}.nick_name, ${this.userTable}.gender, ${this.userTable}.city, ${this.userTable}.avatar
     FROM ${this.userTable}
    WHERE user_name = ?`
    if (password) sql += `AND password = '${password}'`
    return query(sql, userName)
  }

  create (data) {
    const sql = `INSERT INTO ${this.userTable} SET ?`
    return query(sql, data)
  }

  update (data) {
    const {
      userName,
      nickName,
      avatar,
      city
    } = data
    const sql = `UPDATE ${this.userTable} SET nick_name = ?,avatar = ?,city = ? WHERE user_name = ?`
    return query(sql, [nickName, avatar, city, userName])
  }

  changePassword (data) {
    const {
      userName,
      password,
      newPassword
    } = data
    const sql = `UPDATE ${this.userTable} SET password = ? WHERE user_name = ? AND password = ?`
    return query(sql, [newPassword, userName, password])
  }
}

module.exports = new UserModel()
