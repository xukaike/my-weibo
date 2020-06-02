const utils = require('koa-joi-router')()
const { loginCheck } = require('../middleware/loginCheck')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../controllers/utils')

utils.prefix('/api/utils')

utils.route({
  method: 'post',
  path: '/upload',
  handler: [loginCheck, koaForm(), async (ctx, next) => {
    const file = ctx.req.files.file
    if (!file) return
    const { path, name, size, type } = file
    ctx.body = await saveFile({ filePath: path, name, size, type })
  }]
})

module.exports = utils
