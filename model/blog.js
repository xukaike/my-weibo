/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 10:56:04
 */
const { query } = require('./db')

class BlogModel {
  constructor () {
    this.name = BlogModel
    this.blogTable = 'blog'
    this.userTable = 'user'
  }

  create ({ userId, image, content }) {
    const data = {
      user_id: userId,
      image,
      content
    }
    const sql = `INSERT INTO ${this.blogTable} SET ? `
    return query(sql, data)
  }

  getBlogListByUser ({ userName, pageIndex, pageSize }) {
    const sql = `SELECT ${this.blogTable}.id,${this.blogTable}.content, ${this.blogTable}.image, ${this.blogTable}.created_at,${this.blogTable}.updated_at,${this.userTable}.user_name,${this.userTable}.nick_name,${this.userTable}.avatar 
    FROM ${this.blogTable} LEFT JOIN ${this.userTable}
    ON ${this.blogTable}.user_id = ${this.userTable}.id
    WHERE ${this.userTable}.user_name = ?
    ORDER BY ${this.blogTable}.id DESC
    LIMIT ?,?`
    return query(sql, [userName, pageIndex * pageSize, pageSize])
  }
}

module.exports = new BlogModel()
