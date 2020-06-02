/*
 * @Author: xukai
 * @Date: 2020-06-01 18:10:58
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 09:53:34
 */
const assert = require('assert')
const request = require('../libs/request')
const config = require('../config/test')
const { host, USER_PREFIX } = config

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

describe('user', () => {
  it('isExist', async () => {
    const options = {
      method: 'POST',
      uri: host + USER_PREFIX + '/isExist',
      body: {
        userName
      },
      json: true
    }
    const res = await request.post(options)
    assert.strictEqual(res.errno, 10003)
  })

  it('register', async () => {
    const options = {
      method: 'POST',
      uri: host + USER_PREFIX + '/register',
      body: {
        userName,
        password
      },
      json: true
    }
    const res = await request.post(options)
    assert.strictEqual(res.errno, 0)
  })

  it('isExist', async () => {
    const options = {
      method: 'POST',
      uri: host + USER_PREFIX + '/isExist',
      body: {
        userName
      },
      json: true
    }
    const res = await request.post(options)
    assert.strictEqual(res.errno, 0)
  })

  it('login', async () => {
    const options = {
      method: 'POST',
      uri: host + USER_PREFIX + '/login',
      body: {
        userName,
        password
      },
      json: true
    }
    const res = await request.post(options)
    assert.strictEqual(res.errno, 0)
  })
})
