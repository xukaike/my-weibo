/*
 * @Author: xukai
 * @Date: 2020-06-03 13:53:24
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-03 14:01:24
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')
const { SQUARE_KEY_PREFIX, SQUARE_CACHE_TIMEOUT } = require('../config/constant')

/**
 * 获取广场微博缓存
 * @param {number} pageIndex
 * @param {number} pageSize
 */
async function getSquareCache (pageIndex, pageSize) {
  const key = `${SQUARE_KEY_PREFIX}${pageIndex}_${pageSize}`

  const cacheResult = await get(key)
  if (cacheResult != null) {
    return cacheResult
  }

  const result = await getBlogListByUser({ pageIndex, pageSize })
  set(key, result, SQUARE_CACHE_TIMEOUT)
  return result
}

module.exports = { getSquareCache }
