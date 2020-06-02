/*
 * @Author: xukai
 * @Date: 2020-06-01 18:10:58
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-02 15:17:56
 */
const assert = require('assert')
const supertest = require('supertest')
const server = require('../app').callback()
const request = supertest(server)

const prefix = '/api/user'
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
let cookie = ''

describe('user', () => {
  it('isExist', async () => {
    const res = await request.post(prefix + '/isExist').send({ userName })
    assert.strictEqual(res.body.errno, 10003)
  })

  it('register', async () => {
    const res = await request.post(prefix + '/register').send({ userName, password })
    assert.strictEqual(res.body.errno, 0)
  })

  it('isExist', async () => {
    const res = await request.post(prefix + '/isExist').send({ userName })
    assert.strictEqual(res.body.errno, 0)
  })

  it('login', async () => {
    const res = await request.post(prefix + '/login').send({ userName, password })
    assert.strictEqual(res.body.errno, 0)

    // 获取 cookie
    cookie = res.headers['set-cookie'].join(';')
  })

  it('changeInfo', async () => {
    const res = await request.patch(prefix + '/changeInfo').send({
      nickName: `u_${Date.now()}`,
      city: '北京',
      picture: `p_${Date.now()}`
    }).set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('changePassword', async () => {
    const res = await request.patch(prefix + '/changePassword').send({
      password,
      newPassword: `p_${Date.now()}`
    }).set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('logout', async () => {
    const res = await request.post(prefix + '/logout').set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })
})
