/*
 * @Author: xukai
 * @Date: 2020-06-01 11:12:38
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 16:34:53
 */

const { createTable } = require('./tables')

Promise.all(createTable)

module.exports = {
  userModel: require('./user'),
  blogModel: require('./blog')
}
