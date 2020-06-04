/*
 * @Author: xukai
 * @Date: 2020-06-01 11:12:38
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-04 11:16:42
 */

const { createTable } = require('./tables')

Promise.all(createTable)

module.exports = {
  userModel: require('./user'),
  blogModel: require('./blog'),
  userRelationModel: require('./userRelation'),
  atRelationModel: require('./atRelation')
}
