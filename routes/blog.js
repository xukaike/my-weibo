const router = require('koa-joi-router')
const Joi = router.Joi
const blog = router()
const { loginCheck } = require('../middleware/loginCheck')
const ctl = require('../controllers/blog')

blog.prefix('/api/blog')

// 创建微博
blog.route({
  method: 'POST',
  path: '/create',
  validate: {
    body: {
      content: Joi.string().allow(null, ''),
      image: Joi.string().allow(null, '')
    },
    type: 'json'
  },
  handler: [loginCheck, ctl.create]
})

module.exports = blog
