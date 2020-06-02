const { blogModel } = require('../model/index')

async function create ({ userId, content, image }) {
  const res = await blogModel.create({ userId, content, image })
  return res.affectedRows
}

module.exports = {
  create
}
