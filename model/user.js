/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by:   xukai
 * @Last Modified time: 2020-06-01 16:04:24
 */
const { query } = require('./db')

class UserModel {
  constructor () {
    this.name = UserModel
    this.userTable = 'user'
  }

  getByName (userName) {
    const sql = `SELECT * FROM ${this.userTable}
    WHERE user_name = ?`
    return query(sql, userName)
  }

  create (data) {
    const sql = `INSERT INTO ${this.userTable} SET ?`
    return query(sql, data)
  }
}

module.exports = new UserModel()
