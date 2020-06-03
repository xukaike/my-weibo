/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 18:24:31
 */
const { query } = require('./db')

class BlogModel {
  constructor () {
    this.name = BlogModel
    this.blogTable = 'blog'
    this.userTable = 'user'
    this.userRelationTable = 'user_relation'
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

  getBlogListByUser ({ userId, pageIndex = 0, pageSize = 10, count = false }) {
    let sql = ''
    if (count) {
      sql = `SELECT COUNT(${this.blogTable}.id) AS count FROM ${this.blogTable} LEFT JOIN ${this.userTable} 
      ON ${this.blogTable}.user_id = ${this.userTable}.id `
      if (userId) {
        sql += `WHERE ${this.userTable}.id = ? `
        return query(sql, [userId])
      }
      return query(sql)
    } else {
      sql = `SELECT ${this.blogTable}.id,${this.blogTable}.content, ${this.blogTable}.image, ${this.blogTable}.created_at,${this.blogTable}.updated_at,${this.userTable}.user_name,${this.userTable}.nick_name,${this.userTable}.avatar 
      FROM ${this.blogTable} LEFT JOIN ${this.userTable}
      ON ${this.blogTable}.user_id = ${this.userTable}.id `
      if (userId) {
        sql += `WHERE ${this.userTable}.id = ? `
        return query(sql, [userId, pageIndex * pageSize, pageSize])
      }
      sql += `ORDER BY ${this.blogTable}.id DESC
      LIMIT ?,?`

      return query(sql, [pageIndex * pageSize, pageSize])
    }
  }

  getHomeBlogList ({ userId, pageIndex = 0, pageSize = 10, count = false }) {
    let sql = ''
    if (count) {
      sql = `SELECT COUNT(${this.blogTable}.id)
      FROM ${this.userRelationTable} 
      LEFT JOIN ${this.userTable} 
      ON ${this.userRelationTable}.user_id = ${this.userTable}.id 
      LEFT JOIN ${this.blogTable}
      ON ${this.userTable}.id = ${this.blogTable}.user_id 
      WHERE ${this.userRelationTable}.follower_id = ?`

      return query(sql, userId)
    } else {
      sql = `SELECT ${this.blogTable}.id,${this.blogTable}.content, ${this.blogTable}.image, ${this.blogTable}.created_at,${this.blogTable}.updated_at,${this.userTable}.user_name,${this.userTable}.nick_name,${this.userTable}.avatar  
      FROM ${this.userRelationTable} 
      LEFT JOIN ${this.userTable} 
      ON ${this.userRelationTable}.user_id = ${this.userTable}.id 
      LEFT JOIN ${this.blogTable}
      ON ${this.userTable}.id = ${this.blogTable}.user_id 
      WHERE ${this.userRelationTable}.follower_id = ?
      ORDER BY ${this.blogTable}.id DESC
      LIMIT ?,?`

      return query(sql, [userId, pageIndex * pageSize, pageSize])
    }
  }
}

module.exports = new BlogModel()
