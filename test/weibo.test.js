/*
 * @Author: xukai
 * @Date: 2020-06-01 18:10:58
 * @Last Modified by: xukai
 * @Last Modified time: 2020-06-04 14:56:37
 */
const assert = require('assert')
const supertest = require('supertest')
const server = require('../app').callback()
const request = supertest(server)

const userPrefix = '/api/user'
const blogPrefix = '/api/blog'
const profilePrefix = '/api/profile'
const squarePrefix = '/api/square'
const atMePrefix = '/api/atMe'
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
let cookie = ''

describe('user', () => {
  it('isExist', async () => {
    const res = await request.post(userPrefix + '/isExist').send({ userName })
    assert.strictEqual(res.body.errno, 10003)
  })

  it('register', async () => {
    const res = await request.post(userPrefix + '/register').send({ userName, password })
    assert.strictEqual(res.body.errno, 0)
  })

  it('isExist', async () => {
    const res = await request.post(userPrefix + '/isExist').send({ userName })
    assert.strictEqual(res.body.errno, 0)
  })

  it('login', async () => {
    const res = await request.post(userPrefix + '/login').send({ userName, password })
    assert.strictEqual(res.body.errno, 0)

    // 获取 cookie
    cookie = res.headers['set-cookie'].join(';')
  })

  it('changeInfo', async () => {
    const res = await request.patch(userPrefix + '/changeInfo').send({
      nickName: `u_${Date.now()}`,
      city: '北京',
      picture: `p_${Date.now()}`
    }).set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('changePassword', async () => {
    const res = await request.patch(userPrefix + '/changePassword').send({
      password,
      newPassword: `p_${Date.now()}`
    }).set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('createBlog', async () => {
    const res = await request.post(blogPrefix + '/create').send({
      content: '测试内容',
      image: ''
    })
      .set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('profileLoadMore', async () => {
    const res = await request.get(profilePrefix + `/loadMore/${userName}/0`)
      .set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('squareLoadMore', async () => {
    const res = await request.get(squarePrefix + '/loadMore/0')
      .set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('follow', async () => {
    const res = await request.post(profilePrefix + '/follow').send({ userId: 1 })
      .set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('unFollow', async () => {
    const res = await request.post(profilePrefix + '/unFollow').send({ userId: 1 })
      .set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('atMe', async () => {
    const res = await request.get(atMePrefix + '/loadMore/0').send({ pageIndex: 0 })
      .set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })

  it('logout', async () => {
    const res = await request.post(userPrefix + '/logout').set('cookie', cookie)
    assert.strictEqual(res.body.errno, 0)
  })
})
