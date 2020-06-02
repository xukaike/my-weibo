const router = require('koa-joi-router')
const Joi = router.Joi
const user = router()
const ctl = require('../controllers/user')
const { loginCheck } = require('../middleware/loginCheck')

user.prefix('/api/user')

user.route({
  method: 'post',
  path: '/isExist',
  validate: {
    body: {
      userName: Joi.string().required()
    },
    type: 'json'
  },
  handler: ctl.isExist
})

user.route({
  method: 'post',
  path: '/register',
  validate: {
    body: {
      userName: Joi.string().required(),
      password: Joi.string().required(),
      gender: Joi.number().default(2)
    },
    type: 'json'
  },
  handler: ctl.register
})

user.route({
  method: 'post',
  path: '/login',
  validate: {
    body: {
      userName: Joi.string().required(),
      password: Joi.string().required()
    },
    type: 'json'
  },
  handler: ctl.login
})

user.route({
  method: 'patch',
  path: '/changeInfo',
  validate: {
    body: {
      nickName: Joi.string().allow(null, ''),
      city: Joi.string().allow(null, ''),
      picture: Joi.string().allow(null, '')
    },
    type: 'json'
  },
  handler: [loginCheck, ctl.changeInfo]
})

user.route({
  method: 'patch',
  path: '/changePassword',
  validate: {
    body: {
      password: Joi.string(),
      newPassword: Joi.string()
    },
    type: 'json'
  },
  handler: [loginCheck, ctl.changePassword]
})

user.route({
  method: 'post',
  path: '/logout',
  handler: [loginCheck, ctl.logout]
})

module.exports = user
