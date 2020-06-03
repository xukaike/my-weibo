const { userRelationModel } = require('../model/index')

async function addFollwer ({ userId, followerId }) {
  const res = await userRelationModel.create({ userId, followerId })
  return res.affectedRows
}

async function unFollow ({ userId, followerId }) {
  const res = await userRelationModel.delete({ userId, followerId })
  return res.affectedRows
}

module.exports = { addFollwer, unFollow }
