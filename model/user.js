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
}

module.exports = new UserModel()
