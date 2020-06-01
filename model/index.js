/*
 * @Author: xukai
 * @Date: 2020-06-01 11:12:38
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-01 14:29:54
 */

const { createTable } = require('./tables')

Promise.all(createTable)

module.exports = {
  userModel: require('./user')
}
