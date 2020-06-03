const { userRelationModel } = require('../model/index')

async function addFollwer ({ userId, followerId }) {
  const res = await userRelationModel.create({ userId, followerId })
  return res.affectedRows
}

module.exports = { addFollwer }
