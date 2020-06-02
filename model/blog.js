/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 16:38:03
 */
const { query } = require('./db')

class BlogModel {
  constructor () {
    this.name = BlogModel
    this.blogTable = 'blog'
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
}

module.exports = new BlogModel()
