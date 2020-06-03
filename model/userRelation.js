/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 16:20:31
 */
const { query } = require('./db')

class UserRelation {
  constructor () {
    this.name = UserRelation
    this.userRelationTable = 'user_relation'
  }

  create ({ userId, followerId }) {
    const sql = `INSERT INTO ${this.userRelationTable} SET user_id = ?, follower_id = ?`
    return query(sql, [userId, followerId])
  }

  delete ({ userId, followerId }) {
    const sql = `DELETE FROM ${this.userRelationTable} WHERE user_id = ? AND follower_id = ?`
    return query(sql, [userId, followerId])
  }
}

module.exports = new UserRelation()
