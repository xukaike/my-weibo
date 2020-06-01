const router = require('koa-joi-router')
const Joi = router.Joi
const user = router()
const ctl = require('../controllers/user')

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

module.exports = user
