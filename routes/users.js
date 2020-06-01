const router = require('koa-joi-router')
const Joi = router.Joi
const user = router()
const ctl = require('../controllers/user')

user.prefix('/api/user')

// user.route({
//   method: 'post',
//   path: '/register',
//   validate: {
//     body: {

//     }
//   },
//   ctl: ctl.register// todo
// })

user.route({
  method: 'post',
  path: '/isExist',
  validate: {
    body: {
      userName: Joi.string().required()
    },
    type: 'json'
  },
  handler: ctl.isExist// todo
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

module.exports = user
