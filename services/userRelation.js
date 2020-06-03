const { userRelationModel } = require('../model/index')
const { formatUsers } = require('../utils/format')

async function addFollwer ({ userId, followerId }) {
  const res = await userRelationModel.create({ userId, followerId })
  return res.affectedRows
}

async function unFollow ({ userId, followerId }) {
  const res = await userRelationModel.delete({ userId, followerId })
  return res.affectedRows
}

async function getFollowersByUser (userId) {
  const res = await userRelationModel.getFollowersByUser(userId)
  formatUsers(res)
  const count = res.length
  return {
    count,
    userList: res
  }
}

async function getUsersByFollower (followerId) {
  const res = await userRelationModel.getUsersByFollower(followerId)
  formatUsers(res)
  const count = res.length
  return {
    count,
    userList: res
  }
}

module.exports = {
  addFollwer,
  unFollow,
  getUsersByFollower,
  getFollowersByUser
}
