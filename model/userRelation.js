/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 17:45:56
 */
const { query } = require('./db')

class UserRelation {
  constructor () {
    this.name = UserRelation
    this.userRelationTable = 'user_relation'
    this.userTable = 'user'
  }

  create ({ userId, followerId }) {
    const sql = `INSERT INTO ${this.userRelationTable} SET user_id = ?, follower_id = ?`
    return query(sql, [followerId, userId])
  }

  delete ({ userId, followerId }) {
    const sql = `DELETE FROM ${this.userRelationTable} WHERE user_id = ? AND follower_id = ?`
    return query(sql, [followerId, userId])
  }

  getFollowersByUser (userId) {
    const sql = `SELECT ${this.userTable}.id, ${this.userTable}.user_name, ${this.userTable}.nick_name, ${this.userTable}.avatar, ${this.userTable}.city, ${this.userTable}.gender
    FROM ${this.userRelationTable} LEFT JOIN ${this.userTable}
    ON ${this.userRelationTable}.follower_id = ${this.userTable}.id
    WHERE ${this.userRelationTable}.user_id = ?`
    return query(sql, userId)
  }

  getUsersByFollower (followerId) {
    const sql = `SELECT ${this.userTable}.id, ${this.userTable}.user_name, ${this.userTable}.nick_name, ${this.userTable}.avatar, ${this.userTable}.city, ${this.userTable}.gender
    FROM ${this.userRelationTable} LEFT JOIN ${this.userTable}
    ON ${this.userRelationTable}.user_id = ${this.userTable}.id
    WHERE ${this.userRelationTable}.follower_id = ?`
    return query(sql, followerId)
  }
}

module.exports = new UserRelation()
