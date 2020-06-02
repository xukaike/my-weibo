/*
 * @Author: xukai
 * @Date: 2020-06-01 11:09:54
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 15:26:20
 */
'use strict'

const { query } = require('./db')

const user = `CREATE TABLE IF NOT EXISTS user(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL COMMENT '用户名',
  password VARCHAR(255) NOT NULL COMMENT '密码',
  nick_name VARCHAR(255) NOT NULL COMMENT '昵称',
  gender TINYINT UNSIGNED NOT NULL DEFAULT 2 COMMENT '性别 0:女,1:男,2:其他',
  city VARCHAR(255) COMMENT '城市',
  avatar VARCHAR(255) COMMENT '头像',
  craeted_at datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id)
)`

const blog = `CREATE TABLE IF NOT EXISTS blog(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL COMMENT '用户id',
  content TEXT COMMENT '微博内容',
  image VARCHAR(255) COMMENT '图片',
  craeted_at datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY(id)
)`

const tables = [user, blog]

const createTable = tables.map(table => {
  return query(table)
})

module.exports = {
  createTable
}
