/*
 * @Author: xukai
 * @Date: 2020-06-01 16:04:46
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-01 16:16:20
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/constant')

function md5 (content) {
  const _md5 = crypto.createHash('md5')
  const secret = `passwordis${content}&salt=${CRYPTO_SECRET_KEY}`
  return _md5.update(secret).digest('hex')
}

module.exports = md5
