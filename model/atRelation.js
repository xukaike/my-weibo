/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-04 14:17:25
 */
const { query } = require('./db')

class AtRelationModel {
  constructor () {
    this.name = AtRelationModel
    this.atRelationTable = 'at_relation'
    this.blogTable = 'blog'
    this.userTable = 'user'
  }

  create (userId, blogId) {
    const sql = `INSERT INTO ${this.atRelationTable} SET user_id = ?, blog_id = ?,is_read = 0`
    return query(sql, [userId, blogId])
  }

  getAtMeCount (userId) {
    const sql = `SELECT COUNT(id) AS count FROM ${this.atRelationTable} WHERE user_id = ? AND is_read = 0`
    return query(sql, userId)
  }

  getAtMeBlog ({ userId, pageIndex = 0, pageSize = 10, count = false }) {
    if (count) {
      const sql = `SELECT COUNT(${this.blogTable}.id) AS count
      FROM ${this.atRelationTable} LEFT JOIN ${this.blogTable}
      ON ${this.atRelationTable}.blog_id = ${this.blogTable}.id
      LEFT JOIN ${this.userTable} 
      ON ${this.blogTable}.user_id = ${this.userTable}.id 
      WHERE ${this.atRelationTable}.user_id = ? `
      return query(sql, userId)
    } else {
      const sql = `SELECT ${this.blogTable}.id,${this.blogTable}.content, ${this.blogTable}.image, ${this.blogTable}.created_at,${this.blogTable}.updated_at,${this.userTable}.user_name,${this.userTable}.nick_name,${this.userTable}.avatar 
      FROM ${this.atRelationTable} LEFT JOIN ${this.blogTable}
      ON ${this.atRelationTable}.blog_id = ${this.blogTable}.id
      LEFT JOIN ${this.userTable} 
      ON ${this.blogTable}.user_id = ${this.userTable}.id 
      WHERE ${this.atRelationTable}.user_id = ?
      ORDER BY ${this.blogTable}.id DESC
      LIMIT ?,?`
      return query(sql, [userId, pageIndex * pageSize, pageSize])
    }
  }

  markAsRead (userId) {
    const sql = `UPDATE ${this.atRelationTable} SET is_read = 1 WHERE ${this.atRelationTable}.user_id = ?`
    return query(sql, userId)
  }
}

module.exports = new AtRelationModel()
