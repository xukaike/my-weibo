const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const user = require('./routes/users')
const userView = require('./routes/view/user')
const blogView = require('./routes/view/blog')
const errorView = require('./routes/view/error')

const { REDIS_CONF } = require('config')
const { SESSION_SECRET_KEY } = require('./config/constant')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, 'public')))

app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}))

app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid',
  prefix: 'weibo:sess:',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.middleware())
app.use(userView.middleware())
app.use(blogView.middleware())
app.use(errorView.middleware())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
